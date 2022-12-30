using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using theater_laak.Models;

public class loginDTO
{
    public string username { get; set; }
    public string password { get; set; }
}


[Route("api")]
[ApiController]
public class LoginController : ControllerBase
{

    UserManager<ApplicationUser> _usermanager;

    public LoginController(UserManager<ApplicationUser> u)
    {
        _usermanager = u;
    }

    // [HttpGet]
    // //[Authorize(Roles="Medewerker")]
    // [Route("test")]
    // public void DoSomething(){
    //     Console.WriteLine("this ran");
    //    //var x =  User.Claims.Where(x=>x.Type == ClaimTypes.Name).FirstOrDefault()?.Value;
    //     //Console.WriteLine(x);
    //     Console.WriteLine(User.Identity.Name);
    // }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult> login([FromBody] loginDTO credentials)
    {
        System.Console.Write("validating login crededentials of user: " + credentials.username);
        var user = await _usermanager.FindByNameAsync(credentials.username);

        var result = await _usermanager.CheckPasswordAsync(user, credentials.password);

        if (result == false)
        {
            return Unauthorized("wrong username or password");
        }

        var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("awef98awef978haweof8g7aw789efhh789awef8h9awh89efh89awe98f89uawef9j8aw89hefawef"));

        var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.UserName) };
        var roles = await _usermanager.GetRolesAsync(user);
        
        foreach (var role in roles)
            claims.Add(new Claim(ClaimTypes.Role, role));
        var tokenOptions = new JwtSecurityToken
        (
            issuer: "https://localhost:7209",
            audience: "https://localhost:7209",
            claims: claims,
            expires: DateTime.Now.AddMinutes(10),
            signingCredentials: signingCredentials
        );
        return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions), user.UserName });

    }

    [HttpGet]
    [Route("verifyToken")]
    [Authorize]
    public ActionResult verifyToken (){
        return Ok("Token Verified");
    }
}