using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using theater_laak.Data;
using theater_laak.Models;


namespace theater_laak.Controllers;


public class AdminDTO : Admin
{
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }
}

public class ArtiestDTO : Artiest
{
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }
}

public class MedewerkerDTO : Medewerker
{

    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }

}

// public class TokenDTO{
//     public string 
// }

public class RoleDTO
{

    [Required(ErrorMessage = "Role is required")]
    public string Role { get; set; }
}

public class UserDTO : RoleDTO
{

    [Required(ErrorMessage = "UserName is required")]
    public string UserName { get; set; }
}


//[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly UserManager<Admin> _adminManager;
    private readonly UserManager<Medewerker> _medewerkerManager;
    private readonly UserManager<Artiest> _artiestManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    //private readonly SignInManager<Artiest> _signInManager_artiest;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ApplicationDbContext _context;
    private readonly ILogger<AccountController> _logger;




    public AccountController(UserManager<ApplicationUser> p, UserManager<Medewerker> u, UserManager<Artiest> a, UserManager<Admin> ad,
    SignInManager<ApplicationUser> s, RoleManager<IdentityRole> r, ApplicationDbContext c, ILogger<AccountController> logger)
    {
        _userManager = p;
        _medewerkerManager = u;
        _artiestManager = a;
        _adminManager = ad;
        _signInManager = s;
        _roleManager = r;
        _context = c;
        _logger = logger;
    }

    [HttpPost]
    //[Authorize(Roles = "Admin")]
    [Route("RegistreerMedewerker")]
    public async Task<ActionResult> RegistreerMedewerker([FromBody] MedewerkerDTO medewerkerDTO)
    {
        var result = await _medewerkerManager
        .CreateAsync(medewerkerDTO, medewerkerDTO.Password);
        if (!result.Succeeded)
        {
            return new BadRequestObjectResult(result);
        }
        else
        {
            // var user = await _medewerkerManager
            // .FindByIdAsync(medewerkerDTO.Id);
            // await _medewerkerManager.AddToRoleAsync(user, "medewerker");
            return StatusCode(201);
        }

    }

    // [HttpPost]
    // //[Authorize(Roles = "Admin")]
    // [Route("AddRole")]
    // public async Task<ActionResult> addRole([FromBody] RoleDTO roleDTO)
    // {
    //     var roleExists = await _roleManager
    //     .RoleExistsAsync(roleDTO.Role);
    //     if (!roleExists)
    //     {
    //         var result = await _roleManager.CreateAsync(new IdentityRole(roleDTO.Role));
    //         return !result.Succeeded ? new BadRequestObjectResult(result) : StatusCode(201);
    //     }
    //     else
    //     {
    //         return new ConflictResult();
    //     }
    // }

    [HttpPost]
    [Route("AssignRole")]
    public async Task<ActionResult> assignRole([FromBody] UserDTO userDTO)
    {
        var user = await _userManager
        .FindByNameAsync(userDTO.UserName);

        if (user == null)
        {
            return NotFound();
        }

        var result = await _userManager
        .AddToRoleAsync(user, userDTO.Role);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(StatusCode(201));
    }

    [HttpPost]
    [Route("RegistreerArtiest")]
    public async Task<ActionResult> RegistreerArtiest(ArtiestDTO artiestDTO)
    {
        var result = await _artiestManager
        .CreateAsync(artiestDTO, artiestDTO.Password);

        if (!result.Succeeded)
        {
            return new BadRequestObjectResult(result);
        }
        return StatusCode(201);
    }

    [HttpPost]
    [Route("RegistreerAdmin")]
    public async Task<ActionResult> RegistreerAdmin(AdminDTO adminDTO)
    {
        var result = await _adminManager
        .CreateAsync(adminDTO, adminDTO.Password);

        if (!result.Succeeded)
        {
            return new BadRequestObjectResult(result);
        }
        return StatusCode(201);
    }

    [HttpPost]
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
    [Route("GetDonateurs")]
    public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetDonateurs()
    {
        var users = await _userManager.Users.ToListAsync();
        var gedoneerd = users.Where(u => u.Donaties != null).ToList();

        if (gedoneerd == null){
            return NotFound();
        }

        var donateurs = gedoneerd.Where(x => x.Donaties.Any(x => x.TotaalBedrag >= 1000)).ToList();

        if (donateurs == null)
        {
            return NotFound();
        }
        
        return donateurs;
    }


    [HttpDelete("{userName}")]
    [Route("DeleteUser")]
    public async Task<IActionResult> DeleteUser(string userName){

        if(_userManager.Users == null){
            return NotFound();
        }
        
       var user = await _userManager
       .Users
       .FirstOrDefaultAsync(x=>x.UserName.Equals(userName));

        if(user == null){
            return NotFound();
        }

        await _userManager.DeleteAsync(user);
        return Ok();
    }

    [HttpDelete("{groepsNaam}")]
    [Route("DeleteGroep")]
    public async Task<IActionResult> DeleteGroep(string groepsnaam){
        if(_userManager.Users == null){
            return NotFound();
        }
        
       var groep = await _context
       .ArtiestGroepen
       .FirstOrDefaultAsync(x=>x.GroepsNaam.Equals(groepsnaam));

        if(groep == null){
            return NotFound();
        }

        _context.Remove(groep);
        await _context.SaveChangesAsync();
        return Ok();
    }


    // [HttpDelete("{userName}")]
    // [Route("DeleteMedewerker")]
    // public async Task<IActionResult> DeleteMedewerker(string _userName)
    // {
    //     if (_context.Medewerkers == null)
    //     {
    //         return NotFound();
    //     }
    //     var medewerker = await _context.Medewerkers.FindAsync(_userName);
    //     if (medewerker == null)
    //     {
    //         return NotFound();
    //     }

    //     _context.Medewerkers.Remove(medewerker);
    //     await _context.SaveChangesAsync();

    //     return NoContent();
    // }

    // [HttpDelete("{userName}")]
    // [Route("DeleteArtiest")]
    // public async Task<IActionResult> DeleteArtiest(string _userName)
    // {
    //     if (_context.Artiesten == null)
    //     {
    //         return NotFound();
    //     }
    //     var artiest = await _context.Artiesten.FindAsync(_userName);
    //     if (artiest == null)
    //     {
    //         return NotFound();
    //     }

    //     _context.Artiesten.Remove(artiest);
    //     await _context.SaveChangesAsync();

    //     return NoContent();
    // }
}
