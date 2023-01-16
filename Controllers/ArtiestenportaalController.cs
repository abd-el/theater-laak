using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using theater_laak.Data;
using theater_laak.Models;

namespace theater_laak.Controllers;

public class AutoriseerArtiestenOfHoger : AuthorizeAttribute {
    public AutoriseerArtiestenOfHoger() {
        Roles = "Artiest, Admin, Medewerker";
    }
}

[Route("api/[controller]")]
[ApiController]
public class ArtiestenportaalController : ControllerBase {
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly UserManager<Artiest> _artiestenManager;

    public ArtiestenportaalController(ApplicationDbContext c, UserManager<ApplicationUser> p, UserManager<Artiest> a)
    {
        _context = c;
        _userManager = p;
        _artiestenManager = a;
    }

    [HttpGet]
    [Route("GetGroepen")]
    [AutoriseerArtiestenOfHoger]
    public async Task<ActionResult> GetGroepen(){
        var groepen = await _context.ArtiestGroepen
            .Include(g => g.Artiesten)
            .ToListAsync();

        var claimsIdentity = User.Identities.First();        
        var userName = claimsIdentity.Name;          
        var user = await _userManager.FindByNameAsync(userName);

        var groupOfUser = groepen
            .Where(g => g.Artiesten.Contains(user))
            .FirstOrDefault();
        
        int? IdOfGroupOfUser = null;

        if (groupOfUser != null) {
            IdOfGroupOfUser = groupOfUser.ArtiestenGroepId;
        }

        IEnumerable<object> groepData = new List<Object>();

        for(var i = 0; i < groepen.Count(); i++){
            var groep = groepen[i];
            groepData = groepData.Append(new {
                id = groep.ArtiestenGroepId,
                email = groep.GroepsEmail,
                naam = groep.GroepsNaam,
                artiesten = groep.Artiesten.Select(a => new {
                    id = a.Id,
                    naam = a.UserName
                })
            });
        }

        return Ok(new {
            success = true,
            groepData = groepData,
            IdOfGroupOfUser = IdOfGroupOfUser
        });
    }

    [HttpPost]
    [Route("MaakGroep")]
    [AutoriseerArtiestenOfHoger]
    public async Task<ActionResult> MaakGroep([FromBody] ArtiestenGroepJsonGegevens gegevens){
        var bestaatAl = _context.ArtiestGroepen.Count(g => g.GroepsNaam == gegevens.groepsNaam) > 0;
        if(bestaatAl){
            return StatusCode(400, new {
                success = false,
                bericht = "Er bestaat al een groep met deze naam"
            });
        }

        var groep = new ArtiestenGroep(gegevens.groepsNaam);
        groep.GroepsEmail = gegevens.groepsEmail;

        var claimsIdentity = User.Identities.First();        
        var userName = claimsIdentity.Name;          
        var artiest = await _artiestenManager.FindByNameAsync(userName);

        if(artiest != null){
            groep.Artiesten.Add(artiest);
        }

        _context.ArtiestGroepen.Add(groep);
        await _context.SaveChangesAsync();

        return Ok(new {
            success = true,
            bericht = "Groep successvol aangemaakt",
            groep = new {
                id = groep.ArtiestenGroepId,
                naam = groep.GroepsNaam,
                artiesten = groep.Artiesten.Select(a => new {
                    id = a.Id,
                    naam = a.UserName
                })
            }
        });
    }

    [HttpPost]
    [Route(template: "SluitAan")]
    [AutoriseerArtiestenOfHoger]
    public async Task<ActionResult> SluitAan([FromBody] GroepIdJson gegevens){
        var groep = _context.ArtiestGroepen.Where(g => g.ArtiestenGroepId == gegevens.groepsId).First();
        if(groep == null){
            return StatusCode(400, new {
                success = false,
                bericht = "Deze groep bestaat niet."
            });
        }

        var claimsIdentity = User.Identities.First();
        var userName = claimsIdentity.Name;
        var artiest = await _artiestenManager.FindByNameAsync(userName);

        if(artiest == null){
            return StatusCode(403, new {
                success = false,
                bericht = "Je bent geen artiest."
            });
        }

        var groepVanGebruiker = _context.ArtiestGroepen
            .Include(g => g.Artiesten)
            .Where(g => g.Artiesten.Contains(artiest))
            .FirstOrDefault();

        if (groepVanGebruiker != null) {
            return StatusCode(400, new {
                success = false,
                bericht = "Je zit al in een groep."
            });
        }

        groep.Artiesten.Add(artiest);
        await _context.SaveChangesAsync();

        return Ok(new {
            success = true,
            bericht = "Je zit nu in de groep."
        });
    }

    [HttpPost]
    [Route("Vertrek")]
    [AutoriseerArtiestenOfHoger]
    public async Task<ActionResult> Vertrek([FromBody] GroepIdJson gegevens){
        var groep = _context.ArtiestGroepen.Where(g => g.ArtiestenGroepId == gegevens.groepsId).First();
        if(groep == null){
            return StatusCode(400, new {
                success = false,
                bericht = "Deze groep bestaat niet."
            });
        }

        var claimsIdentity = User.Identities.First();
        var userName = claimsIdentity.Name;
        var artiest = await _artiestenManager.FindByNameAsync(userName);

        if(artiest == null){
            return StatusCode(403, new {
                success = false,
                bericht = "Je bent geen artiest."
            });
        }

        var groepVanGebruiker = _context.ArtiestGroepen
            .Include(g => g.Artiesten)
            .Where(g => g.Artiesten.Contains(artiest))
            .FirstOrDefault();

        if (groepVanGebruiker == null) {
            return StatusCode(400, new {
                success = false,
                bericht = "Je zit niet in een groep."
            });
        }

        var removed = groep.Artiesten.Remove(artiest);
        await _context.SaveChangesAsync();

        if (removed) {
            return Ok(new {
                success = true,
                bericht = "Je zit nu niet meer in de groep."
            });
        } else {
            return StatusCode(500, new {
                success = false,
                bericht = "Er is iets misgegaan met de verandering."
            });
        }
    }

    [HttpPost]
    [Route(template: "MaakBoeking")]
    [AutoriseerArtiestenOfHoger]
    public async Task<ActionResult> MaakBoeking([FromBody] BoekingJsonGegevens gegevens){
        var claimsIdentity = User.Identities.First();
        var userName = claimsIdentity.Name;
        var artiest = await _artiestenManager.FindByNameAsync(userName);

        if (artiest == null) {
            return StatusCode(403, new {
                success = false,
                bericht = "Je bent geen artiest."
            });
        }

        if (gegevens.prijs < 1 || gegevens.prijs > 30){
            return StatusCode(400, new {
                success = false,
                bericht = "De prijs moet tussen 1 en 30 euro liggen."
            });
        }

        var optredensInZelfdeZaalEnZelfdeDag = await _context.Optredens
        .Where(o => o.ZaalId == gegevens.zaalId)
        .Where(o => o.DatumTijdstip.Date.CompareTo( 
                new DateTime(
                    int.Parse(
                        gegevens.datum.Substring(
                            0, 
                            gegevens.datum.IndexOf('-')
                        )
                    ),
                    int.Parse(
                        gegevens.datum.Substring(
                            gegevens.datum.IndexOf('-') + 1, 
                            gegevens.datum.LastIndexOf('-') - gegevens.datum.IndexOf('-') - 1
                        )
                    ),
                        int.Parse(gegevens.datum.Substring(
                            gegevens.datum.LastIndexOf('-') + 1
                        )
                    )
                )
            ) == 0
        )
        .ToListAsync();

        // parse XX:XX or X:XX to Time
        Int32.TryParse(gegevens.tijdstip.Substring(0, gegevens.tijdstip.IndexOf(':')), out int hour);
        Int32.TryParse(gegevens.tijdstip.Substring(gegevens.tijdstip.IndexOf(':') + 1), out int minute);

        var timeStart = new TimeOnly(hour, minute);

        Int32.TryParse(gegevens.eindTijdstip.Substring(0, gegevens.tijdstip.IndexOf(':')), out int hourEnd);
        Int32.TryParse(gegevens.tijdstip.Substring(gegevens.tijdstip.IndexOf(value: ':') + 1), out int minuteEnd);

        var timeEnd = new TimeOnly(hourEnd, minuteEnd);

        if(timeStart.CompareTo(new TimeOnly(8, 0)) < 0 || timeStart.CompareTo(new TimeOnly(23, 0)) > 0 || timeEnd.CompareTo(new TimeOnly(8, 0)) < 0 || timeEnd.CompareTo(new TimeOnly(23, 0)) > 0){
            return StatusCode(400, new {
                success = false,
                bericht = "Je kan niet voor 08:00 of na 23:00 boeken."
            });
        }

        for(var i = 0; i < optredensInZelfdeZaalEnZelfdeDag.Count(); i++){
            var dezeOptreden = optredensInZelfdeZaalEnZelfdeDag[i];
            var dezeVoorstelling = await _context.Voorstellingen.FindAsync(dezeOptreden.VoorstellingId);

            var start = TimeOnly.FromDateTime(dezeOptreden.DatumTijdstip);
            var end = TimeOnly.FromDateTime(dezeOptreden.DatumTijdstip).Add(new TimeSpan(0, 0, dezeVoorstelling.TijdsduurInMinuten, 0));

            if(timeStart >= start && timeStart <= end || timeEnd >= start && timeEnd <= end){
                return StatusCode(400, new {
                    success = false,
                    bericht = "Er is al een optreden in deze zaal op dit tijdstip gepland."
                });
            }
        }

        var voorstelling = await _context.Voorstellingen.FindAsync(gegevens.voorstellingId);
        if (voorstelling == null) {
            return StatusCode(400, new {
                success = false,
                bericht = "Deze voorstelling bestaat niet."
            });
        }

        var optreden = new Optreden {
            Bevestigd = null,
            Voorstelling = voorstelling,
            Zaal = await _context.Zalen.FindAsync(gegevens.zaalId),
            DatumTijdstip = new DateTime(
                    int.Parse(
                    gegevens.datum.Substring(
                        0, 
                        gegevens.datum.IndexOf('-')
                    )
                ),
                    int.Parse(
                    gegevens.datum.Substring(
                        gegevens.datum.IndexOf('-') + 1, 
                        gegevens.datum.LastIndexOf('-') - gegevens.datum.IndexOf('-') - 1
                    )
                ),
                    int.Parse(gegevens.datum.Substring(
                        gegevens.datum.LastIndexOf('-') + 1
                    )
                )
            ).AddHours(hour).AddMinutes(minute),
            Prijs = gegevens.prijs
        };

        if (gegevens.groep != null) {
            var artiestenGroep = await _context.ArtiestGroepen.FindAsync(gegevens.groep);
            if (artiestenGroep == null) {
                return StatusCode(400, new {
                    success = false,
                    bericht = "De groep bestaat niet."
                });
            } else {
                optreden.ArtiestenGroep = artiestenGroep;
            }
        } else {
            optreden.Artiest = artiest;
        }

        _context.Optredens.Add(optreden);

        await _context.SaveChangesAsync();

        return Ok(new {
            success = true,
            bericht = "Je hebt een verzoek tot een boeking gemaakt."
        });
    }

    [HttpGet]
    [Route(template: "EigenOptredens")]
    [AutoriseerArtiestenOfHoger]
    public async Task<ActionResult> EigenOptredens(){
        var claimsIdentity = User.Identities.First();
        var userName = claimsIdentity.Name;
        var artiest = await _artiestenManager.FindByNameAsync(userName);

        if (artiest == null) {
            return StatusCode(403, new {
                success = false,
                bericht = "Je bent geen artiest."
            });
        }

        var optredens = await _context.Optredens
        .Where(o => o.ArtiestId == artiest.Id || o.ArtiestenGroepId == artiest.ArtiestenGroepId)
        .ToListAsync();

        return Ok(new {
            success = true,
            optredens = optredens
        });
    }
}