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

    [HttpPost]
    [Route("Voorstelling")]
    public async Task<ActionResult> VoegVoorstelling([FromBody] Voorstelling voorstelling)
    {
        if (!_context.Voorstellingen.Select(x => x.Titel).Contains(voorstelling.Titel) || _context.Voorstellingen.Count() == 0)
        {
            await _context.Voorstellingen.AddAsync(voorstelling);
            await _context.SaveChangesAsync();
            return Ok(voorstelling);
        }
        
        else 
        {
            return Ok(StatusCode(403));
        }
    }


    [HttpGet]
    [Route("Voorstellingen")]
    public async Task<ActionResult<IEnumerable<Voorstelling>>> GetVoorstellingen()
    {
        if (_context.Voorstellingen == null)
        {
            return NotFound();
        }
        return Ok(await _context.Voorstellingen.ToListAsync()); 
    }
}