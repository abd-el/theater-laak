using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using theater_laak.Models;
using Newtonsoft.Json;

public class loginDTO
{
    public string username { get; set; }
    public string password { get; set; }
}


[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{

    static HttpClient client = new HttpClient();
    UserManager<ApplicationUser> _usermanager;

    public LoginController(UserManager<ApplicationUser> u)
    {
        _usermanager = u;
    }


    [HttpPost]
    // [Route("login")]
    public async Task<ActionResult> login([FromBody] loginDTO credentials)
    {
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
        return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions), user });

    }

    public class captchaResponse { public string responseToken { get; set; } }
    public class ApiResponse {
        public bool success {get;set;}
        public string challenge_ts {get;set;}
        public string hostname {get;set;}
    }

    [HttpPost]
    [Route("ReCaptcha")]
    public async Task<ActionResult> test([FromBody] captchaResponse _captchaResponse)
    {
        bool IsHuman = false;

        try
        {
            if (client.BaseAddress == null)
            {
                client.BaseAddress = new Uri("https://www.google.com/recaptcha/api/siteverify");
            }

            var secret = "6LfLIeAjAAAAAChyaAzq3bdsWGB04eS-x-n8595o";
            HttpResponseMessage resp = await client.PostAsync($"?secret={secret}&response={_captchaResponse.responseToken}", null);

            if (resp.IsSuccessStatusCode)
            {
                var json = await resp.Content.ReadFromJsonAsync<ApiResponse>();
                Console.WriteLine(json.success);
                IsHuman = json.success;
            }
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine("\nException Caught!");
            Console.WriteLine("Message :{0} ", e.Message);
            throw e;
        }

        return Ok(IsHuman);
    }

    [HttpGet]
    [Route("validateToken")]
    [Authorize]
    public ActionResult validateToken()
    {

        return Ok();
    }
}