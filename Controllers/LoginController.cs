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
using theater_laak.Data;
using PasswordGenerator;

public class loginmodel
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
    ApplicationDbContext _context;

    public LoginController(UserManager<ApplicationUser> u, ApplicationDbContext context)
    {
        _usermanager = u;
        _context = context;
    }


    [HttpPost]
    // [Route("login")]
    public async Task<ActionResult> login([FromBody] loginmodel credentials)
    {

        var user = await _usermanager.FindByNameAsync(credentials.username);
        var result = await _usermanager.CheckPasswordAsync(user, credentials.password);

        if (user.lockout == true)
        {
            if (DateTime.Compare((DateTime)user.unlockDate, DateTime.Now) < 0)
            {
                user.lockout = false;
                user.FailedAttempts = 0;
                await _usermanager.UpdateAsync(user);
                user = await _usermanager.FindByIdAsync(user.Id);
            }
            else return Unauthorized("locked");
        }

        if (!result)
        {
            if (user.FailedAttempts >= 2)
            {
                user.lockout = true;
                user.FailedAttempts = 0;
                var currentDate = DateTime.Now;
                user.unlockDate = currentDate.AddMinutes(10);
                await _usermanager.UpdateAsync(user);
                return Unauthorized("locked");
            }

            if (user.FailedAttempts == null)
            {
                user.FailedAttempts = 1;
                await _usermanager.UpdateAsync(user);
            }
            else
            {
                user.FailedAttempts++;
            }

            await _usermanager.UpdateAsync(user);
            return Unauthorized("wrong username or password");
        }
        else
        {
            user.FailedAttempts = null;
            await _usermanager.UpdateAsync(user);
        }

        if (user.EmailConfirmed && user.TwoFactorEnabled)
        {
            var token = await Add2FaToken(user);
            EmailSender emailsender = new EmailSender();
            await emailsender.SendEmail($"Uw toegangscode is: {token} De code verloopt na 30 minuten", "drampersad740@gmail.com"); //user.Email
            return Ok("2fa");
        }

        var tokenOptions = await GenerateJwt(user);

        return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions), user });

    }

    private async Task<string> Add2FaToken(ApplicationUser user)
    {
        var pwd = new Password(12);
        var randomstring = pwd.Next();
        var date = DateTime.Now;
        var expire = date.AddMinutes(30);
        user._2faExpDate = expire;
        user._2faToken = randomstring;
        await _usermanager.UpdateAsync(user);

        return randomstring;
    }

    public class _2faJson { public string token { get; set; } public string userName { get; set; } }
    [HttpPost]
    [Route("validateEmail")]
    public async Task<ActionResult> validateEmail(_2faJson json)
    {
        var user = await _usermanager.FindByNameAsync(json.userName);
        if (json.token == user._2faToken)
        {
            if (DateTime.Compare(DateTime.Now, (DateTime)user._2faExpDate) <= 0)
            {
                user.EmailConfirmed = true;
                await _usermanager.UpdateAsync(user);
                var tokenOptions = await GenerateJwt(user);
                return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions), user });
            }
            return BadRequest("expired");
        }
        return BadRequest("wrong");
    }

public class usernameJson{ public string userName {get;set;} }
    [HttpPost]
    [Route("sendEmail")]
    public async Task<ActionResult> sendEmail([FromBody]usernameJson json)
    {
        var user = await _usermanager.FindByNameAsync(json.userName);
        if(user == null){
            return BadRequest("noUser");
        }
        if(!user.EmailConfirmed){
            return BadRequest("noEmail");
        }
        var email = user.Email;
        var token = await Add2FaToken(user);

        EmailSender sender = new EmailSender();
        await sender.SendEmail($"Uw toegangscode is: {token} De code verloopt na 30 minuten", "drampersad740@gmail.com");
        return Ok();
    }   

    private async Task<JwtSecurityToken> GenerateJwt(ApplicationUser user)
    {
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
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: signingCredentials
        );

        return tokenOptions;
    }

    public class captchaResponse { public string responseToken { get; set; } }
    public class ApiResponse
    {
        public bool success { get; set; }
        public string challenge_ts { get; set; }
        public string hostname { get; set; }
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