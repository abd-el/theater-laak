using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using theater_laak.Data;
using theater_laak.Models;
using System.Net.Http.Headers;

namespace theater_laak.Controllers;

//[Authorize]
[Route("api/[controller]")]
[ApiController]
public class DonatieController : ControllerBase {
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;

    [HttpPost]
    [Route("Authoriseer")]
    public async Task<ActionResult> Authoriseer([FromForm] string token){
        System.Console.WriteLine(token);

        var user = await _userManager.GetUserAsync(User);

        await _context.Donaties.AddAsync(new Donatie {
            UserId = user?.Id,
        });

        var userInDb = await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
        userInDb.IkDoneerToken = token;

        var html = "<a href='https://localhost:44461/'>Klik hier om terug te gaan</a>";
        return new ContentResult
        {
            Content = html,
            ContentType = "text/html"
        };
    }

    [HttpPost]
    [Route("MaakDonatie")]
    public async Task<ActionResult> MaakDonatie([FromBody] float bedrag, string bericht){
        var user = await _userManager.GetUserAsync(User);

        var client = new HttpClient();

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", user.IkDoneerToken);
        
        var content = new FormUrlEncodedContent(new[] {
            new KeyValuePair<string, string>("Doel", "1500"),
            new KeyValuePair<string, string>("Bedrag", bedrag.ToString()),
            new KeyValuePair<string, string>("Bericht", bericht)
        });

        var response = await client.PostAsync("https://api.ikdoneer.nl/v1/donaties", content);

        // if response is 200 OK, add to database
        if (response.StatusCode == System.Net.HttpStatusCode.OK) {
            _context.Donaties.Add(new Donatie {
                UserId = user?.Id,
                TotaalBedrag = bedrag,
                Datum = DateTime.Now,
                Bericht = bericht
            });

            // return success=true resultaat="Je donatie is succesvol verwerkt!"
            return Ok(new {
                success = true,
                resultaat = "Je donatie is succesvol verwerkt!"
            });
        } else {
            // log error
            System.Console.WriteLine(response);

            // return success=false resultaat="Er is iets misgegaan met het verwerken van je donatie. Probeer het later nog eens."
            return Ok(new {
                success = false,
                resultaat = "Er is iets misgegaan met het verwerken van je donatie. Probeer het later nog eens."
            });
        }
    }
}