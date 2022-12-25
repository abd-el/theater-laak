using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using theater_laak.Data;
using theater_laak.Models;


namespace theater_laak.Controllers;

//[Authorize]
[Route("api/[controller]")]
[ApiController]
public class DoneerController : ControllerBase {
    private readonly UserManager<ApplicationUser> _userManager;

    [HttpPost]
    [Route("Doneer")]
    public ActionResult Doneer(){
        return Ok();
    }
}