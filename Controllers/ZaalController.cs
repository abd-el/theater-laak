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

[Route("api/[controller]")]
[ApiController]
public class ZaalController : ControllerBase {
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public ZaalController(ApplicationDbContext c, UserManager<ApplicationUser> p)
    {
        _context = c;
        _userManager = p;
    }

    [HttpGet]
    [Route("GetZalen")]
    public async Task<ActionResult> GetZalen(){
        var zalen = await _context.Zalen
            .Include(z => z.Stoelen)
            .ToListAsync();

        return Ok(zalen);
    }

    [HttpPost]
    [Route("AddZaal")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> AddZaal([FromBody] ZaalCreatieJson gegevens){
        var zaal = new Zaal();
        zaal.AddRang(gegevens.rangEenAantalStoelen, gegevens.rangEenAantalRijen, 1);
        zaal.AddRang(gegevens.rangTweeAantalStoelen, gegevens.rangTweeAantalRijen, 2);
        zaal.AddRang(gegevens.rangDrieAantalStoelen, gegevens.rangDrieAantalRijen, 3);

        var success = await _context.Zalen.AddAsync(zaal);
        if (success == null) {
            return BadRequest(new {
                success = false,
                bericht = "Zaal niet toegevoegd"
            });
        }

        return Ok(new {
            success = true,
            bericht = "Zaal toegevoegd"
        });
    }

    [HttpDelete]
    [Route("DeleteZaal")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteZaal([FromBody] ZaalDeleteJson gegevens){
        var zaal = await _context.Zalen
            .Include(z => z.Stoelen)
            .FirstOrDefaultAsync(z => z.ZaalId == gegevens.zaalId);

        if (zaal == null) {
            return NotFound(new {
                success = false,
                bericht = "Zaal niet gevonden"
            });
        }

        _context.Zalen.Remove(zaal);

        return Ok(new {
            success = true,
            bericht = "Zaal verwijderd"
        });
    }
}

public class ZaalCreatieJson {
    public int rangEenAantalStoelen { get; set; }
    public int rangEenAantalRijen { get; set; }
    public int rangTweeAantalStoelen { get; set; }
    public int rangTweeAantalRijen { get; set; }
    public int rangDrieAantalStoelen { get; set; }
    public int rangDrieAantalRijen { get; set; }
}

public class ZaalDeleteJson {
    public int zaalId { get; set; }
}