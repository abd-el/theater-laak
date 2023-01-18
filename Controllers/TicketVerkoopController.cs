using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using theater_laak.Data;
using theater_laak.Models;

namespace theater_laak.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TicketVerkoopController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public TicketVerkoopController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpPost]
    [Route("MaakTicket")]
    public async Task<ActionResult> MaakTicket([FromBody] TicketCreatieJson ticketVerkoop)
    {
        var optreden = await _context.Optredens
            .Include(o => o.Tickets)
            .FirstOrDefaultAsync(o => o.OptredenId == ticketVerkoop.optredenId);

        if (optreden == null) {
            return StatusCode(400, new {
                success = false,
                bericht = "Optreden niet gevonden"
            });
        }

        var stoel = await _context.Stoelen
            .Include(s => s.Tickets)
            .FirstOrDefaultAsync(s => s.StoelId == ticketVerkoop.stoelId);

        if (stoel == null) {
            return StatusCode(400, new {
                success = false,
                bericht = "Stoel niet gevonden"
            });
        }

        if (!stoel.IsBeschikbaar(optreden.OptredenId)) {
            return StatusCode(400, new {
                success = false,
                bericht = "Stoel is al gereserveerd"
            });
        }

        var claimsIdentity = User.Identities.First();        
        var userName = claimsIdentity.Name;
        ApplicationUser? user = null;
        if(userName != null){
            user = await _userManager.FindByNameAsync(userName);
        }

        var ticket = new Ticket {
            Optreden = optreden,
            Stoel = stoel,
            ApplicationUser = user
        };

        await _context.Tickets.AddAsync(ticket);
        await _context.SaveChangesAsync();

        return Ok(new {
            success = true,
            bericht = "Ticket is succesvol aangemaakt"
        });
    }

    [HttpGet]
    [Route("GetEigenTickets")]
    [Authorize]
    public async Task<ActionResult> GetEigenTickets()
    {
        var claimsIdentity = User.Identities.First();        
        var userName = claimsIdentity.Name;
        ApplicationUser? user = null;
        if(userName != null){
            user = await _userManager.FindByNameAsync(userName);
        }

        if (user == null) {
            return StatusCode(400, new {
                success = false,
                bericht = "Gebruiker niet gevonden"
            });
        }

        var tickets = await _context.Tickets
            .Include(t => t.Optreden)
            .Include(t => t.Stoel)
            .Where(t => t.UserId == user.Id)
            .ToListAsync();

        return Ok(new {
            success = true,
            data = tickets
        });
    }
}

public class TicketCreatieJson {
    public int optredenId { get; set; }
    public int stoelId { get; set; }
}