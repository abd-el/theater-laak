using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using theater_laak.Data;
using theater_laak.Models;

namespace theater_laak.Controllers;

// public class MedewerkerDTO : Medewerker{


// }

public class RoleDTO
{

    [Required(ErrorMessage = "Role is required")]
    public string Role { get; set; }
}

public class UserDTO : RoleDTO
{

    [Required(ErrorMessage = "Id is required")]
    public string Id { get; set; }
}


//[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<Medewerker> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    //private readonly SignInManager<Artiest> _signInManager_artiest;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ApplicationDbContext _context;
    private readonly ILogger<AccountController> _logger;




    public AccountController(UserManager<Medewerker> u, SignInManager<ApplicationUser> s, RoleManager<IdentityRole> r, ApplicationDbContext c, ILogger<AccountController> logger)
    {
        _userManager = u;
        _signInManager = s;
        _roleManager = r;
        _context = c;
        _logger = logger;
    }

    [HttpPost]
    //[Authorize(Roles = "Admin")]
    [Route("registreerMedewerker")]
    public async Task<ActionResult> RegistreerMedewerker([FromBody] Medewerker medewerker)
    {
        var result = await _userManager.CreateAsync(medewerker);
        if (!result.Succeeded)
        {
            return new BadRequestObjectResult(result);
        }
        else
        {
            var user = await _userManager.FindByIdAsync(medewerker.Id);
            // await _userManager.AddToRoleAsync(user, "medewerker");
            return StatusCode(201);
        }

    }

    [HttpPost]
    //[Authorize(Roles = "Admin")]
    [Route("addRole")]
    public async Task<ActionResult> addRole([FromBody] RoleDTO roleDTO)
    {
        var roleExists = await _roleManager.RoleExistsAsync(roleDTO.Role);
        if (!roleExists)
        {
            var result = await _roleManager.CreateAsync(new IdentityRole(roleDTO.Role));
            return !result.Succeeded ? new BadRequestObjectResult(result) : StatusCode(201);
        }
        else
        {
            return new ConflictResult();
        }
    }

    [HttpPost]
    [Route("AssignRole")]
    public async Task<ActionResult> assignRole([FromBody] UserDTO userDTO)
    {
        var user = await _userManager.FindByIdAsync(userDTO.Id);
        if (user == null)
        {
            return NotFound();
        }

        var result = await _userManager.AddToRoleAsync(user, userDTO.Role);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(StatusCode(201));
    }
}
