using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using theater_laak.Data;
using theater_laak.Models;

namespace theater_laak.Controllers;

[Route("api/[controller]")]
[ApiController]

public class ProgrammeringController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public ProgrammeringController(ApplicationDbContext c)
    {
        _context = c;
    }

    [HttpGet]
    [Route("Voorstellingen")]
    public async Task<ActionResult<IEnumerable<Voorstelling>>> GetVoorstellingen()
    {
        if (_context.Voorstellingen == null)
        {
            return NotFound();
        }

        return await _context.Voorstellingen.ToListAsync();
    }

    [HttpPost]
    [Route("Voorstelling")]
    public async Task<ActionResult> VoegVoorstelling([FromBody] Voorstelling voorstelling)
    {
        if (!_context.Voorstellingen.Select(x => x.Titel).Contains(voorstelling.Titel) || _context.Voorstellingen.Count() == 0)
        {
            await _context.Voorstellingen.AddAsync(voorstelling);
            await _context.SaveChangesAsync();

            return Ok($"Voorstelling {voorstelling.Titel} is toegevoegd!");
        }

        return StatusCode(403, $"{voorstelling.Titel} is al eerder toegevoegd.");
    }

    [HttpPut]
    [Route("Voorstelling")]
    public async Task<IActionResult> VeranderVoorstelling(int id, Voorstelling v)
    {

        if (_context.Voorstellingen.Count() == 0)
        {
            return NotFound("Er zijn geen voorstellingen beschikbaar.");
        }

        var voorstelling = await _context.Voorstellingen.FindAsync(id);

        if (voorstelling == null)
        {
            return NotFound($"Voorstelling met de Id: {id} niet gevonden.");
        }

        voorstelling.Afbeelding = v.Afbeelding;
        voorstelling.Titel = v.Titel;
        voorstelling.Beschrijving = v.Beschrijving;
        voorstelling.TijdsduurInMinuten = v.TijdsduurInMinuten;
        voorstelling.Optredens = v.Optredens;
        // voorstelling.ZaalId = v.ZaalId;
        // voorstelling.Zaal = v.Zaal;

        _context.Voorstellingen.Update(voorstelling);
        await _context.SaveChangesAsync();
        return Ok($"Voorstelling met de Id: {id} is aangepast!");
    }

    [HttpDelete]
    [Route("Voorstelling")]
    public async Task<ActionResult> VerwijderVoorstelling(int VoorstellingId)
    {
        if (_context.Voorstellingen.Count() == 0)
        {
            return NotFound("Er zijn geen voorstellingen beschikbaar.");
        }

        var voorstelling = await _context.Voorstellingen.FindAsync(VoorstellingId);

        if (voorstelling == null)
        {
            return NotFound($"Voorstelling met de Id: {VoorstellingId} niet gevonden.");
        }

        _context.Voorstellingen.Remove(voorstelling);
        await _context.SaveChangesAsync();

        return Ok($"Voorstelling met de Id: {VoorstellingId} is verwijderd!");
    }

    [HttpGet]
    [Route("Optredens")]
    public async Task<ActionResult<IEnumerable<Optreden>>> GetOptredens()
    {
        var vandaag = DateTime.Today;
        if (_context.Optredens == null)
        {
            return NotFound();
        }

        return await _context.Optredens.Where(o => o.DatumTijdstip >= vandaag).ToListAsync();
    }

    [HttpPost]
    [Route("Optreden")]
    public async Task<ActionResult> VoegOptreden([FromBody] Optreden optreden)
    {

        if (!_context.Voorstellingen.Select(v => v.VoorstellingId).Contains(optreden.VoorstellingId)) //controleert of de aangegeven voorstellingID bestaat
        {
            return NotFound($"Voorstelling met id: {optreden.VoorstellingId} was niet gevonden.");
        }

        var vandaag = DateTime.Today;
        var voorstelling = await _context.Voorstellingen.FindAsync(optreden.VoorstellingId);

        if (_context.Optredens.Select(o => o.DatumTijdstip).Contains(optreden.DatumTijdstip) && 
        optreden.DatumTijdstip.CompareTo(_context.Optredens.Select(o => o.DatumTijdstip.AddMinutes(voorstelling.TijdsduurInMinuten))) <= 0) //controleert of de aangegeven datumTijdstip niet bestaat en of 
        {
            return BadRequest($"Deze voorstelling is al ingepland voor de gekozen datum en tijdstip: {optreden.DatumTijdstip}, probeer een optreden op een latere tijdstip dan {optreden.DatumTijdstip.AddMinutes(voorstelling.TijdsduurInMinuten)} toe te voegen.");
        }

        await _context.Optredens.AddAsync(optreden);

        await _context.SaveChangesAsync();

        return Ok($"Optreden met id: {optreden.OptredenId} is toegevoegd voor {voorstelling.Titel}!");
    }

    // [HttpDelete]
    // [Route("Voorstelling")]
    // public async Task<ActionResult> VerwijdesrVoorstelling(int VoorstellingId)
    // {
    //     if (_context.Voorstellingen.Count() == 0)
    //     {
    //         return NotFound("Er zijn geen voorstellingen beschikbaar.");
    //     }

    //     var voorstelling = await _context.Voorstellingen.FindAsync(VoorstellingId);

    //     if (voorstelling == null)
    //     {
    //         return NotFound($"Voorstelling met de Id: {VoorstellingId} niet gevonden.");
    //     }

    //     _context.Voorstellingen.Remove(voorstelling);
    //     await _context.SaveChangesAsync();

    //     return Ok($"Voorstelling met de Id: {VoorstellingId} is verwijderd!");
    // }
}