using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using theater_laak.Data;
using theater_laak.Models;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;

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
            groep = groep
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
    [Route(template: "Vertrek")]
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

        var optredensInZelfdeZaal = await _context.Optredens
        .Where(o => o.ZaalId == gegevens.ZaalId)
        .Where(o => o.DatumTijdstip.Date == 
            new DateTime(
                int.Parse(gegevens.datum.Substring(
                        gegevens.datum.LastIndexOf('-') + 1
                    )
                ),
                int.Parse(
                    gegevens.datum.Substring(
                        gegevens.datum.IndexOf('-') + 1, 
                        gegevens.datum.LastIndexOf('-') - gegevens.datum.IndexOf('-') - 1
                    )
                ),
                int.Parse(
                    gegevens.datum.Substring(
                        0, 
                        gegevens.datum.IndexOf('-')
                    )
                )
            )
        )
        .ToListAsync();

        for(var i = 0; i < optredensInZelfdeZaal.Count(); i++){
            // parse DD-MM-YYYY string to Date class
            // could also be D-M-YYYY
            // or DD-M-YYYY or D-MM-YYYY
            var day = gegevens.datum.Substring(0, gegevens.datum.IndexOf('-'));
            var month = gegevens.datum.Substring(gegevens.datum.IndexOf('-') + 1, gegevens.datum.LastIndexOf('-') - gegevens.datum.IndexOf('-') - 1);
            var year = gegevens.datum.Substring(gegevens.datum.LastIndexOf('-') + 1);
            var date = new DateTime(int.Parse(year), int.Parse(month), int.Parse(day));

            var optreden = optredensInZelfdeZaal[i];
            if(optreden.DatumTijdstip.Date == date){

            }
        }

        return Ok(new {
            success = true,
            bericht = "Je hebt een verzoek tot een boeking gemaakt."
        });
    }
}