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
    [Route("RondBestellingAf")]
    public async Task<ActionResult> RondBestellingAf([FromForm] RondBestellingAfGegevensForm gegevens)
    {
        if (!gegevens.succes) {
            var fouteHtml = "<a href='/'>Betaling mislukt. Klik hier om terug te gaan naar home.</a>";

            return new ContentResult {
                Content = fouteHtml,
                ContentType = "text/html"
            };
        }

        var ticketIds = new List<int>();
        // gegevens.reference is een string met de ticketIds gescheiden door een komma (bijvoorbeeld "1,2,3")
        var ticketIdsString = gegevens.reference.Split(",");
        foreach (var ticketIdString in ticketIdsString) {
            int ticketId;
            bool isParsable = Int32.TryParse(ticketIdString, out ticketId);
            if (isParsable) {
                ticketIds.Add(ticketId);
            } else {
                var fouteHtml = "<a href='/'>Betaling mislukt. Klik hier om terug te gaan naar home.</a>";

                return new ContentResult {
                    Content = fouteHtml,
                    ContentType = "text/html"
                };
            }

            var ticket = _context.Tickets.FirstOrDefault(t => t.TicketId == ticketId);

            if (ticket == null) {
                var fouteHtml = "<a href='/'>Betaling mislukt. Klik hier om terug te gaan naar home.</a>";

                return new ContentResult {
                    Content = fouteHtml,
                    ContentType = "text/html"
                };
            }

            if (ticket.Betaald) {
                var fouteHtml = "<a href='/'>Betaling al gedaan voor een van de tickets. Klik hier om terug te gaan naar home.</a>";

                return new ContentResult {
                    Content = fouteHtml,
                    ContentType = "text/html"
                };
            }

            ticket.Betaald = true;
        }

        await _context.SaveChangesAsync();

        var html = "<a href='/rondbestellingaf'>Klik hier om de betaling af te ronden.</a>";
        
        return new ContentResult {
            Content = html,
            ContentType = "text/html"
        };
    }
    
    [HttpPost]
    [Route("MaakTickets")]
    public async Task<ActionResult> MaakTickets([FromBody] TicketsCreatieJson tickets)
    {
        var claimsIdentity = User.Identities.First();        
        var userName = claimsIdentity.Name;
        ApplicationUser? user = null;
        if(userName != null){
            user = await _userManager.FindByNameAsync(userName);
        }

        var hoeveelsteTicket = 0;
        var ticketIds = new List<int>();
        foreach (var ticket in tickets.tickets) {
            hoeveelsteTicket++;
            var optreden = await _context.Optredens
                .Include(o => o.Tickets)
                .FirstOrDefaultAsync(o => o.OptredenId == ticket.optredenId);

            if (optreden == null) {
                return StatusCode(400, new {
                    success = false,
                    bericht = $"Optreden niet gevonden, voor optredenId = {ticket.optredenId}, stoelId = {ticket.stoelId}, voor de {hoeveelsteTicket}e ticket"
                });
            }

            var stoel = await _context.Stoelen
                .Include(s => s.Tickets)
                .FirstOrDefaultAsync(s => s.StoelId == ticket.stoelId);

            if (stoel == null) {
                return StatusCode(400, new {
                    success = false,
                    bericht = $"Stoel niet gevonden, voor optredenId = {ticket.optredenId}, stoelId = {ticket.stoelId} voor de {hoeveelsteTicket}e ticket"
                });
            }

            if (stoel.ZaalId != optreden.ZaalId) {
                return StatusCode(400, new {
                    success = false,
                    bericht = $"Stoel zit niet in hetzelfde zaal als het optreden, voor optredenId = {ticket.optredenId}, stoelId = {ticket.stoelId} voor de {hoeveelsteTicket}e ticket"
                });
            }

            if (!stoel.IsBeschikbaar(optreden.OptredenId)) {
                return StatusCode(400, new {
                    success = false,
                    bericht = $"Stoel is al gereserveerd, voor optredenId = {ticket.optredenId}, stoelId = {ticket.stoelId} voor de {hoeveelsteTicket}e ticket"
                });
            }

            var ticketModel = new Ticket {
                Optreden = optreden,
                Stoel = stoel,
                ApplicationUser = user,
                Betaald = false
            };

            ticketIds.Add(ticketModel.TicketId);

            await _context.Tickets.AddAsync(ticketModel);
        }

        await _context.SaveChangesAsync();

        // ⬇️ dit is een async functie, maar we willen niet wachten op de uitvoering
        TicketControleur.ControleerNaMinuten(ticketIds, 5, _context);

        return Ok(new {
            success = true,
            tickets = tickets.tickets,
            bericht = "Alle tickets zijn succesvol aangemaakt"
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

    [HttpPut]
    [Route("BevestigTickets")]
    public async Task<ActionResult> BevestigTickets([FromBody] BevestigTicketsJson gegevens)
    {
        foreach (var ticketId in gegevens.ticketIds) {
            var ticketModel = await _context.Tickets
                .Include(t => t.Optreden)
                .Include(t => t.Stoel)
                .FirstOrDefaultAsync(t => t.TicketId == ticketId);

            if (ticketModel == null) {
                return StatusCode(400, new {
                    success = false,
                    bericht = $"Ticket niet gevonden, voor ticketId = {ticketId}"
                });
            }

            if (ticketModel.Betaald) {
                return StatusCode(400, new {
                    success = false,
                    bericht = $"Ticket is al betaald, voor ticketId = {ticketId}"
                });
            }

            ticketModel.Betaald = true;
        }

        await _context.SaveChangesAsync();

        return Ok(new {
            success = true,
            ticketIds = gegevens.ticketIds,
            bericht = "Tickets zijn succesvol bevestigd"
        });
    }
}

public class TicketCreatieJson {
    public int optredenId { get; set; }
    public int stoelId { get; set; }
}

public class TicketsCreatieJson {
    public List<TicketCreatieJson> tickets { get; set; }
}

public class RondBestellingAfGegevensForm {
    public string account { get; set; }
    public Boolean succes { get; set; }
    public string reference { get; set; }
}

public class BevestigTicketsJson {
    public List<int> ticketIds { get; set; }
}

public class TicketControleur {
    public static async Task ControleerNaMinuten(List<int> ticketIds, int minuten, ApplicationDbContext _context) {
        await Task.Delay(minuten * 60 * 1000);

        var tickets = await _context.Tickets
            .Include(t => t.Optreden)
            .Include(t => t.Stoel)
            .Where(t => ticketIds.Contains(t.TicketId))
            .ToListAsync();

        foreach (var ticket in tickets) {
            if (!ticket.Betaald) {
                _context.Tickets.Remove(ticket);
            }
        }

        await _context.SaveChangesAsync();
    }
}