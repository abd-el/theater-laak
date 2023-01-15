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
    public async Task<ActionResult> VoegVoorstelling([FromBody] VoorstellingJsonGegevens voorstelling)
    {
        if (!_context.Voorstellingen.Select(x => x.Titel).Contains(voorstelling.titel) || _context.Voorstellingen.Count() == 0)
        {
            await _context.Voorstellingen.AddAsync(new Voorstelling(
                voorstelling.afbeelding,
                voorstelling.titel,
                voorstelling.beschrijving,
                voorstelling.tijdsduurInMinuten
            ));

            await _context.SaveChangesAsync();

            return Ok(new
            {
                bericht = $"{voorstelling.titel} is toegevoegd.",
                success = true
            });
        }

        return StatusCode(403, new
        {
            bericht = $"{voorstelling.titel} was al eerder toegevoegd.",
            success = false
        });
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

    [HttpGet]
    [Route("BevestigdeOptredens")]
    public async Task<ActionResult<IEnumerable<Optreden>>> GetBevestigdeOptredens()
    {
        var vandaag = DateTime.Today;
        if (_context.Optredens == null)
        {
            return NotFound();
        }

        var Optredens = await _context.Optredens.Where(o => o.DatumTijdstip >= vandaag).Where(o => o.Bevestigd == true).ToListAsync();

        return Optredens;
    }

    [HttpGet]
    [Route("NietBevestigdeOptredens")]
    public async Task<ActionResult<IEnumerable<Optreden>>> GetNietBevestigdeOptredens()
    {
        var vandaag = DateTime.Today;
        if (_context.Optredens == null)
        {
            return NotFound();
        }

        var Optredens = await _context.Optredens.Where(o => o.DatumTijdstip >= vandaag).Where(o => o.Bevestigd != true).ToListAsync();

        return Optredens;
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

    [HttpPut]
    [Authorize(Roles = "Admin")]
    [Route("BevestigOptreden")]
    public async Task<IActionResult> BevestigOptreden(int id)
    {

        if (_context.Optredens.Count() == 0)
        {
            return NotFound("Er zijn geen optredens beschikbaar.");
        }

        var optreden = await _context.Optredens.FindAsync(id);

        if (optreden == null)
        {
            return NotFound($"Optreden met de Id: {id} niet gevonden.");
        }

        optreden.Bevestigd = true;

        _context.Optredens.Update(optreden);
        await _context.SaveChangesAsync();
        return Ok($"Optreden met de Id: {id} is bevestigd!");
    }

    [HttpPut]
    [Route("Optreden")]
    public async Task<IActionResult> veranderOptreden(int id, Optreden o)
    {

        if (_context.Optredens.Count() == 0)
        {
            return NotFound("Er zijn geen optredens beschikbaar.");
        }

        var optreden = await _context.Optredens.FindAsync(id);

        if (optreden == null)
        {
            return NotFound($"Optreden met de Id: {id} niet gevonden.");
        }
        optreden.Prijs = o.Prijs;
        optreden.DatumTijdstip = o.DatumTijdstip;
        optreden.ArtiestenGroepId = o.ArtiestenGroepId;
        optreden.ArtiestId = o.ArtiestId;
        optreden.VoorstellingId = o.VoorstellingId;
        optreden.BegunstigersExclusief = o.BegunstigersExclusief;
        optreden.Tickets = o.Tickets;
        optreden.Bevestigd = o.Bevestigd;
        optreden.ZaalId = o.ZaalId;

        _context.Optredens.Update(optreden);
        await _context.SaveChangesAsync();
        return Ok($"Optreden met de Id: {id} is bevestigd!");
    }

    [HttpDelete]
    [Authorize(Roles = "Admin")]
    [Route("Optreden")]
    public async Task<ActionResult> VerwijderOptreden(int OptredenId)
    {
        if (_context.Optredens.Count() == 0)
        {
            return NotFound("Er zijn geen optredens beschikbaar.");
        }

        var optreden = await _context.Optredens.FindAsync(OptredenId);

        if (optreden == null)
        {
            return NotFound($"Voorstelling met de Id: {OptredenId} niet gevonden.");
        }

        _context.Optredens.Remove(optreden);
        await _context.SaveChangesAsync();

        return Ok($"Optreden met de Id: {OptredenId} is verwijderd!");
    }
}