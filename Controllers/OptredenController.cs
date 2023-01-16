using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using theater_laak.Data;
using theater_laak.Models;

namespace theater_laak.Controllers;

public class OptredenJsonGegevens {
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
    public async Task<ActionResult> GetOptreden([FromForm] OptredenJsonGegevens gegevens) {
        // tryparse optredenId
        int id;
        var success = int.TryParse(gegevens.optredenId, out id);
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
            .Where(o => o.OptredenId == id)
            .FirstOrDefaultAsync();

        if (optreden == null) {
            return StatusCode(400, new { 
                bericht = $"Optreden met optredenId = {id} niet gevonden",
                success = false
            });
        }

        return Ok(optreden);
    }
}