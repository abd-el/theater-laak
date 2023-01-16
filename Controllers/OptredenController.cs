using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using theater_laak.Data;
using theater_laak.Models;

namespace theater_laak.Controllers;

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
    [Route("GetOptreden/{voorstellingId}")]
    public async Task<ActionResult> GetOptreden(int voorstellingId) {
        var optreden = await _context.Optredens
            .Include(o => o.Artiest)
            .Include(o => o.ArtiestenGroep)
            .Include(o => o.Voorstelling)
            .Include(o => o.Zaal)
            .Where(o => o.VoorstellingId == voorstellingId)
            .FirstOrDefaultAsync();

        if (optreden == null) {
            return NotFound();
        }

        return Ok(optreden);
    }
}