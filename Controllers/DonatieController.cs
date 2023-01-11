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
    [Authorize]
    [Route("RondAutorisatieAf")]
    public async Task<ActionResult> RondAutorisatieAf([FromBody] DonatieAutorisatieJsonGegevens gegevens){
        var claimsIdentity = User.Identities.First();        
        var userName = claimsIdentity.Name;          
        var user = await _userManager.FindByNameAsync(userName);         
        Console.WriteLine(user);

        user.IkDoneerToken = gegevens.ikDoneerToken;
        _context.SaveChanges();

        return Ok(new {
            success = true,
            resultaat = "Je autorisatie is succesvol verwerkt!"
        });
    }

    [HttpPost]
    [Route("Autoriseer")]
    public ActionResult Autoriseer([FromForm] string token)
    {
        Response.Cookies.Append("IkDoneerToken", token);

        var html = "<a href='https://localhost:44461/ikdoneergeautoriseerd'>Klik hier de IkDoneer autorisatie af te ronden.</a>";
        return new ContentResult
        {
            Content = html,
            ContentType = "text/html"
        };
    }

    [HttpPost]
    [Route("MaakDonatie")]
    public async Task<ActionResult> MaakDonatie([FromBody] DonatieCreatieJsonGegevens gegevens){
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
            Tekst = gegevens.bericht,
        }), Encoding.UTF8, "application/json");

        var response = await client.PostAsync("https://ikdoneer.azurewebsites.net/api/donatie", content);

        // if response is 200 OK, add to database
        if (response.StatusCode == System.Net.HttpStatusCode.OK) {
            string? userId = user?.Id;

            if (gegevens.anoniem) {
                userId = null;
            }

            _context.Donaties.Add(new Donatie {
                UserId = userId,
                TotaalBedrag = Double.Parse(gegevens.hoeveelheid),
                Datum = DateTime.Now,
                Bericht = gegevens.bericht
            });

            _context.SaveChanges();

            // return success=true resultaat="Je donatie is succesvol verwerkt!"
            return Ok(new {
                success = true,
                resultaat = "Je donatie is succesvol verwerkt!"
            });
        } else {
            // log error
            System.Console.WriteLine("error bij donatiecontroller: " + response);

            // get error message
            var error = await response.Content.ReadAsStringAsync();

            // log error message
            System.Console.WriteLine("error bij donatiecontroller (2): " + error);

            return StatusCode(500, new {
                success = false,
                resultaat = "Er is iets misgegaan met het verwerken van je donatie. Probeer het later nog eens. Het kan zijn dat je toegang moet verlenen aan IkDoneer.nl."
            });
        }
    }

    [HttpPost]
    [Authorize]
    [Route("GetDonaties")]
    public async Task<ActionResult> GetDonaties(){
        var claimsIdentity = User.Identities.First();        
        var userName = claimsIdentity.Name;          
        var user = await _userManager.FindByNameAsync(userName);         
        Console.WriteLine(user);

        var donaties = _context.Donaties.Where(d => d.UserId!.Equals(user!.Id)).ToList();
        
        var donatieList = new List<DonatieJsonGegevens>();

        foreach (var donatie in donaties) {
            // add to list
            donatieList.Add(new DonatieJsonGegevens(
                donatie.DonatieId,
                donatie.Datum,
                donatie.TotaalBedrag,
                donatie.UserId,
                donatie.Bericht
            ));
        }

        // return:
        // {success: true, donaties: [donatieList]}

        return Ok(new {
            success = true,
            donaties = donatieList
        });
    }
}