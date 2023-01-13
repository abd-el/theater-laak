using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using theater_laak.Data;
using theater_laak.Models;
using System.Diagnostics;
using System.Security.Claims;

namespace theater_laak.Controllers;


//[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly UserManager<Admin> _adminManager;
    private readonly UserManager<Medewerker> _medewerkerManager;
    private readonly UserManager<Artiest> _artiestManager;
    private readonly UserManager<Klant> _klantManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    //private readonly SignInManager<Artiest> _signInManager_artiest;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ApplicationDbContext _context;
    private readonly ILogger<AccountController> _logger;

    public AccountController(
        UserManager<ApplicationUser> appuser,
        UserManager<Medewerker> medewerker,
        UserManager<Artiest> artiest,
        UserManager<Admin> admin,
        UserManager<Klant> klant,
        SignInManager<ApplicationUser> signIn,
        RoleManager<IdentityRole> role,
        ApplicationDbContext context,
        ILogger<AccountController> logger
        )
    {
        _userManager = appuser;
        _medewerkerManager = medewerker;
        _artiestManager = artiest;
        _adminManager = admin;
        _klantManager = klant;
        _signInManager = signIn;
        _roleManager = role;
        _context = context;
        _logger = logger;
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    [Route("assignRole")]
    public async Task<ActionResult> assignRole([FromBody] string username, string role)
    {

        bool exists = await _roleManager.RoleExistsAsync(role);

        if (exists == false)
        {
            await _roleManager.CreateAsync(new IdentityRole(role));
        }

        var user = await _userManager.FindByNameAsync(username);
        var result = await _userManager.AddToRoleAsync(user, role);

        if (!result.Succeeded)
        {
            return new BadRequestObjectResult(result);
        }
        return StatusCode(201);
    }


    [HttpPost]
    [Route("RegistreerKlant")]
    public async Task<ActionResult> RegistreerKlant([FromForm] Klant klant)
    {
        await _klantManager.CreateAsync(klant, klant.Password);
        var responseCode = await assignRole(klant.UserName, "Klant");

        return responseCode;
    }

    public class test { public string username { get; set; } }
    [HttpPost]
    [Route("UserNameCheck")]
    public async Task<ActionResult> UserNameCheck([FromBody] test username)
    {

        var result = await _userManager.FindByNameAsync(username.username);

        if (result != null) { return BadRequest("userNameBestaat"); }

        return Ok();

    }
    public class test2 { public string wachtwoord { get; set; } }
    [HttpPost]
    [Route("WachtwoordCheck")]
    public async Task<ActionResult> WachtwoordCheck([FromBody] test2 wachtwoord)
    {

        Woordenboek woordenboek = new Woordenboek();
        PwnedPasswords pwnedpasswords = new PwnedPasswords();

        bool bevatWoorden = woordenboek.stringBevatWoord(wachtwoord.wachtwoord, 4);
        bool isBreached = await pwnedpasswords.isPwBreached(wachtwoord.wachtwoord);

        if (bevatWoorden) { return BadRequest("bevatWoord"); }
        if (isBreached) { return BadRequest("PwOnveilig"); }

        return Ok();
    }

    public class Email { public string email {get;set;} }
    [HttpPost]
    [Route("EmailCheck")]
    public async Task<ActionResult> EmailCheck([FromBody] Email emailObj)
    {   
        DisposableEmails disposableEmails = new DisposableEmails();
        var isDisposable = await disposableEmails.CheckEmail(emailObj.email);

        if(isDisposable == true){
            return BadRequest("disposable");
        }

        return Ok();
    }

    [HttpPost]
    [Authorize(Roles = "Admin, Medewerker")]
    public async Task<ActionResult> RegistreerMedewerker([FromBody] Medewerker medewerker)
    {
        var result = await _medewerkerManager
        .CreateAsync(medewerker, medewerker.Password);
        if (!result.Succeeded)
        {
            return new BadRequestObjectResult(result);
        }

        var responseCode = await assignRole(medewerker.UserName, "Medewerker");

        return responseCode;

    }

    [HttpPost]
    [Authorize(Roles = "Admin, Medewerker")]
    [Route("RegistreerArtiest")]
    public async Task<ActionResult> RegistreerArtiest(Artiest artiest)
    {
        var result = await _artiestManager
        .CreateAsync(artiest, artiest.Password);

        if (!result.Succeeded)
        {
            return new BadRequestObjectResult(result);
        }

        var responseCode = await assignRole(artiest.UserName, "Artiest");

        await _context.SaveChangesAsync();

        return responseCode;
    }


    [HttpPost]
    [Authorize(Roles = "Admin")]
    [Route("RegistreerAdmin")]
    public async Task<ActionResult> RegistreerAdmin(Admin adminDTO)
    {
        var result = await _adminManager
        .CreateAsync(adminDTO, adminDTO.Password);

        if (!result.Succeeded)
        {
            return new BadRequestObjectResult(result);
        }

        var responseCode = await assignRole(adminDTO.UserName, "Admin");

        return responseCode;

    }

    [HttpPost]
    [Authorize(Roles = "Admin, Medewerker")]
    [Route("RegistreerGroep")]
    public async Task<ActionResult> RegistreerGroep(ArtiestenGroep artiestengroep)
    {
        var result = await _context
        .ArtiestGroepen
        .FirstOrDefaultAsync(a => a.GroepsNaam.Equals(artiestengroep.GroepsNaam));

        if (result != null)
        {
            return new ConflictResult();
        }

        await _context
        .ArtiestGroepen
        .AddAsync(artiestengroep);

        await _context.SaveChangesAsync();
        return StatusCode(201);
    }

    [HttpGet]
    [Authorize]
    [Route("GetUser")]
    public async Task<ActionResult<ApplicationUser>> GetUser()
    {

        var claimsIdentity = User.Identities.First();
        var userName = claimsIdentity.Name;
        var user = await _userManager.FindByNameAsync(userName);

        if (user == null)
        {
            return Unauthorized(
                new
                {
                    success = false,
                    resultaat = "Gebruiker niet gevonden"
                }
            );
        }

        return Ok(
    new
    {
        success = true,
        resultaat = "De user is geauthenticeerd"
    }
);
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    [Route("GetMedewerkers")]
    public async Task<ActionResult<IEnumerable<Medewerker>>> GetMedewerkers()
    {
        if (_medewerkerManager
        .Users == null)
        {
            return NotFound();
        }
        return await _medewerkerManager.Users.ToListAsync();
    }

    [HttpGet]
    [Authorize(Roles = "Admin, Medewerker")]
    [Route("GetArtiesten")]
    public async Task<ActionResult<IEnumerable<Artiest>>> GetArtiest()
    {
        if (_artiestManager.Users == null)
        {
            return NotFound();
        }
        return await _artiestManager.Users.ToListAsync();
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    [Route("GetAdmins")]
    public async Task<ActionResult<IEnumerable<Admin>>> GetAdmins()
    {
        if (_adminManager.Users == null)
        {
            return NotFound();
        }
        return await _adminManager.Users.ToListAsync();
    }

    [HttpGet]
    [Authorize(Roles = "Admin, Medewerker")]
    [Route("GetGroepen")]
    public async Task<ActionResult<IEnumerable<ArtiestenGroep>>> GetGroepen()
    {
        var result = await _context
        .ArtiestGroepen
        .ToListAsync();

        if (result == null)
        {
            return NotFound();
        }
        return result;
    }


    [HttpGet]
    [Authorize(Roles = "Admin, Medewerker")]
    [Route("GetDonateurs")]
    public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetDonateurs()
    {
        var users = await _userManager.Users.ToListAsync();
        var gedoneerd = users.Where(u => u.Donaties != null).ToList();

        if (gedoneerd == null)
        {
            return NotFound();
        }

        var donateurs = gedoneerd.Where(x => x.Donaties.Any(x => x.TotaalBedrag >= 1000)).ToList();

        if (donateurs == null)
        {
            return NotFound();
        }

        return donateurs;
    }


    [HttpDelete]
    [Authorize(Roles = "Admin, Medewerker")]
    [Route("DeleteUser")]
    public async Task<IActionResult> DeleteUser([FromQuery] string userName)
    {

        if (_userManager.Users == null)
        {
            return NotFound();
        }

        var user = await _userManager
        .Users
        .FirstOrDefaultAsync(x => x.UserName.Equals(userName));

        if (user == null)
        {
            return NotFound();
        }

        await _userManager.DeleteAsync(user);
        return Ok();
    }

    [HttpDelete]
    [Authorize(Roles = "Admin, Medewerker")]
    [Route("DeleteGroep")]
    public async Task<IActionResult> DeleteGroep([FromQuery] string groepsnaam)
    {
        if (_userManager.Users == null)
        {
            return NotFound();
        }

        var groep = await _context
        .ArtiestGroepen
        .FirstOrDefaultAsync(x => x.GroepsNaam.Equals(groepsnaam));

        if (groep == null)
        {
            return NotFound();
        }

        _context.Remove(groep);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPut]
    [Authorize]
    [Route("UpdateWachtwoord")]
    public async Task<IActionResult> UpdateWachtwoord([FromBody] VeranderWachtwoordJsonGegevens veranderWachtwoordJsonGegevens
    )
    {
        var claimsIdentity = User.Identities.First();
        var userName = claimsIdentity.Name;
        var user = await _userManager.FindByNameAsync(userName);
        Console.WriteLine(user);

        if (user == null)
        {
            return Unauthorized(
                new
                {
                    success = false,
                    resultaat = "Gebruiker niet gevonden"
                }
            );
        }

        // compare current password in database to veranderWachtwoordJsonGegevens.huidigWachtwoord
        var result = await _userManager.CheckPasswordAsync(user, veranderWachtwoordJsonGegevens.huidigWachtwoord);

        if (!result)
        {
            // return 400 bad request
            return StatusCode(400, new
            {
                success = false,
                resultaat = "Uw wachtwoord is niet correct"
            }
            );
        }

        await _userManager.RemovePasswordAsync(user);
        await _userManager.AddPasswordAsync(user, veranderWachtwoordJsonGegevens.nieuwWachtwoord);

        return Ok(
            new
            {
                success = true,
                resultaat = "Wachtwoord is succesvol gewijzigd"
            }
        );
    }

    [HttpPut]
    [Authorize]
    [Route("UpdateInstellingen")]
    public async Task<IActionResult> UpdateInstellingen([FromBody] AccountInstellingenJsonGegevens accountInstellingenJsonGegevens
    )
    {
        var claimsIdentity = User.Identities.First();
        var userName = claimsIdentity.Name;
        var user = await _userManager.FindByNameAsync(userName);
        Console.WriteLine(user);

        if (user == null)
        {
            return Unauthorized(
                new
                {
                    success = false,
                    resultaat = "Gebruiker niet gevonden"
                }
            );
        }

        user.Voornaam = accountInstellingenJsonGegevens.voornaam;
        user.Achternaam = accountInstellingenJsonGegevens.achternaam;
        user.Email = accountInstellingenJsonGegevens.email;
        user.Telefoonnummer = accountInstellingenJsonGegevens.telefoonnummer;
        user.GeboorteDatum = accountInstellingenJsonGegevens.geboorteDatum;
        user.Emailvoorkeur = accountInstellingenJsonGegevens.emailvoorkeur;
        await _userManager.UpdateAsync(user);

        return Ok(
            new
            {
                success = true,
                resultaat = "Instellingen zijn succesvol gewijzigd"
            }
        );
    }
}