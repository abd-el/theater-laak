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
public class TestController : ControllerBase {
    private readonly UserManager<ApplicationUser> _userManager;

    [HttpPost]
    [Route("DoeIets")]
    public ActionResult Token([FromForm] string token){
        System.Console.WriteLine(token);
        return Ok();

    // var html = "<a href='https://localhost:44461/'>Klik hier om terug te gaan</a>";
    // return new ContentResult
    // {
    //     Content = html,
    //     ContentType = "text/html"
    // };
    }
}