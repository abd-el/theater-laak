using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using theater_laak.Data;
using theater_laak.Models;

namespace theater_laak.Controllers;

public class OptredenQueryGegevens {
    public string optredenId { get; set; }
}

[Route("api/[controller]")]
[ApiController]
public class OptredenController : ControllerBase {
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public OptredenController(ApplicationDbContext c, UserManager<ApplicationUser> p, UserManager<Artiest> a)
    {
        _context = c;
        _userManager = p;
    }

    [HttpGet]
    [Route("GetOptreden")]
    public async Task<ActionResult> GetOptreden([FromQuery] OptredenQueryGegevens gegevens) {
        // tryparse optredenId
        int optredenId;
        var success = int.TryParse(gegevens.optredenId, out optredenId);
        if(!success) {
            return StatusCode(400, new { 
                bericht = $"optredenId = {gegevens.optredenId} is geen geldig getal",
                success = false
            });
        }

        var optreden = await _context.Optredens
            .Include(o => o.Artiest)
            .Include(o => o.ArtiestenGroep)
            .Include(o => o.Voorstelling)
            .Include(o => o.Zaal)
            .Where(o => o.OptredenId == optredenId)
            .FirstOrDefaultAsync();

        if (optreden == null) {
            return StatusCode(400, new { 
                bericht = $"Optreden met optredenId = {optredenId} niet gevonden",
                success = false
            });
        }

        return Ok(optreden);
    }

    [HttpGet]
    [Route("GetStoelen")]
    public async Task<ActionResult> GetStoelen([FromBody] OptredenQueryGegevens gegevens){
        int optredenId;
        var success = int.TryParse(gegevens.optredenId, out optredenId);
        if(!success) {
            return StatusCode(400, new { 
                bericht = $"optredenId = {gegevens.optredenId} is geen geldig getal",
                success = false
            });
        }

        var optreden = await _context.Optredens
            .Include(o => o.Zaal)
            .ThenInclude(z => z.Stoelen)
            .FirstOrDefaultAsync(o => o.OptredenId == optredenId);

        if (optreden == null) {
            return NotFound(new {
                success = false,
                bericht = "Zaal niet gevonden"
            });
        }

        var zaal = optreden.Zaal;

        var stoelen = new List<Object>();

        foreach (var stoel in zaal.Stoelen) {
            stoelen.Add(new {
                stoelId = stoel.StoelId,
                rang = stoel.Rang,
                rij = stoel.Rij,
                beschikbaar = stoel.IsBeschikbaar(optredenId)
            });
        }

        return Ok(new {
            success = true,
            data = stoelen
        });
    }
}