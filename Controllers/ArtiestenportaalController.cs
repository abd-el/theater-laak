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
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;

    public ArtiestenportaalController(UserManager<ApplicationUser> p, ApplicationDbContext c)
    {
        _userManager = p;
        _context = c;
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

        return Ok(new {
            success = true,
            groepen = groepen,
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
        var user = await _userManager.FindByNameAsync(userName);

        groep.Artiesten.Append(user);

        _context.ArtiestGroepen.Add(groep);
        await _context.SaveChangesAsync();

        return Ok(new {
            success = true,
            bericht = "Groep successvol aangemaakt",
            groep = groep
        });
    }
}