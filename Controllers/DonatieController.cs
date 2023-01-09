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

//[Authorize]
[Route("api/[controller]")]
[ApiController]
public class DonatieController : ControllerBase {
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;

    public DonatieController(UserManager<ApplicationUser> p, ApplicationDbContext c)
    {
        _userManager = p;
        _context = c;
    }

    [HttpPost]
    [Route("Autoriseer")]
    public async Task<ActionResult> Autoriseer([FromForm] string token){
        System.Console.WriteLine(token);

        if(User == null) {
            return Unauthorized();
        }

        var user = await _userManager
        .Users
        .FirstOrDefaultAsync(x => x.UserName.Equals(User.Identity.Name));

        await _context.Donaties.AddAsync(new Donatie {
            UserId = user?.Id,
        });

        // check if user is not null
        if (user == null) {
            Response.Cookies.Append("IkDoneerToken", token);
            System.Console.WriteLine("user is null wat jammer");
        } else {
            user.IkDoneerToken = token;
            _context.SaveChanges();
        }

        var html = "<a href='https://localhost:44461/AutoriseerDonatie'>Klik hier om terug te gaan</a>";
        return new ContentResult
        {
            Content = html,
            ContentType = "text/html"
        };
    }

    [HttpPost]
    [Route("MaakDonatie")]
    public async Task<ActionResult> MaakDonatie([FromBody] DonatieJsonGegevens gegevens){
        var claimsIdentity = User.Identities.First();        
        var userName = claimsIdentity.Name;

        ApplicationUser? user = null;

        if(userName != null){
            user = await _userManager.FindByNameAsync(userName);
        }

        System.Console.WriteLine(user);

        string token = "";

        if (Request == null) {
            return Unauthorized();
        }

        if (user == null) {
            token = Request.Cookies["IkDoneerToken"];
        } else {
            token = user.IkDoneerToken;
        }

        var client = new HttpClient();

        System.Console.WriteLine(token);

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        
        // create json string
        var content = new StringContent(JsonSerializer.Serialize(new {
            Doel = 11,
            Hoeveelheid = gegevens.hoeveelheid,
            Tekst = gegevens.bericht
        }), Encoding.UTF8, "application/json");

        var response = await client.PostAsync("https://ikdoneer.azurewebsites.net/api/donatie", content);

        // if response is 200 OK, add to database
        if (response.StatusCode == System.Net.HttpStatusCode.OK) {
            _context.Donaties.Add(new Donatie {
                UserId = user?.Id,
                TotaalBedrag = Double.Parse(gegevens.hoeveelheid),
                Datum = DateTime.Now,
                Bericht = gegevens.bericht
            });

            // return success=true resultaat="Je donatie is succesvol verwerkt!"
            return Ok(new {
                success = true,
                resultaat = "Je donatie is succesvol verwerkt!"
            });
        } else {
            // log error
            System.Console.WriteLine(response);

            // get error message
            var error = await response.Content.ReadAsStringAsync();

            // log error message
            System.Console.WriteLine(error);

            return StatusCode(500, new {
                success = false,
                resultaat = "Er is iets misgegaan met het verwerken van je donatie. Probeer het later nog eens. Het kan zijn dat je toegang moet verlenen aan IkDoneer.nl."
            });
        }
    }

    [HttpPost]
    [Route("GetDonaties")]
    public async Task<ActionResult> GetDonaties(){
        var user = await _userManager.GetUserAsync(User);

        string token = "";

        if (Request == null) {
            return Unauthorized();
        }

        if (user == null) {
            token = Request.Cookies["IkDoneerToken"];
        } else {
            token = user.IkDoneerToken;
        }

        System.Console.WriteLine(token);

        if (token == "") {
            // return "aub autoriseer ikdoneer.nl account aan theater laak account"
            return StatusCode(403, new {
                success = false,
                resultaat = "Aub autoriseer ikdoneer.nl account aan theater laak account"
            });
        }

        var client = new HttpClient();


        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        var response = await client.GetAsync("https://ikdoneer.azurewebsites.net/api/donatie");

        // if response is 200 OK, return donaties
        if (response.StatusCode == System.Net.HttpStatusCode.OK) {
            // return the body of the response in json format
            var body = await response.Content.ReadAsStringAsync();

            System.Console.WriteLine(body);

            return Ok(body);
        } else {
            // log error
            System.Console.WriteLine(response);

            // get error message
            var error = await response.Content.ReadAsStringAsync();

            // log error message
            System.Console.WriteLine(error);

            return StatusCode(500, new {
                success = false,
            });
        }
    }
}