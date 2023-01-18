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

    HttpClient client = new HttpClient();
    EmailSender emailsender = new EmailSender();
    UserManager<ApplicationUser> _usermanager;
    ApplicationDbContext _context;

    public LoginController(UserManager<ApplicationUser> u, ApplicationDbContext context)
    {
        _usermanager = u;
        _context = context;
    }

    //Deze code is een methode voor het inloggen van gebruikers, waarbij een loginmodel-parameter genaamd credentials wordt verwacht.
    //De methode controleert eerst of de gebruiker momenteel is geblokkeerd en of deze status is verlopen.
    //Vervolgens controleert de code of het opgegeven wachtwoord correct is.
    //Als het wachtwoord niet correct is, wordt de gebruiker geblokkeerd als hij minstens drie mislukte inlogpogingen heeft gehad.
    //Als het wachtwoord correct is, wordt de FailedAttempts-eigenschap van de gebruiker op null gezet.
    //Als de TwoFactorEnabled-eigenschap van de gebruiker op true is ingesteld, wordt een e-mail verzonden met een 2FA-token.
    //Als alles succesvol is afgerond wordt er een Swt-Token gegenereerd en teruggestuurd als antwoord.

    [HttpPost]
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

        if (user.TwoFactorEnabled)
        {
            await SendTokenToEmail(user);
            return Ok("2fa");
        }

        var tokenOptions = await GenerateJwt(user);

        return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions), user });

    }



    public class TweeFactorAuthJsonObject { public string token { get; set; } public string userName { get; set; } }
    [HttpPost]
    [Route("isTokenValid")]
    public async Task<ActionResult> isTokenValid(TweeFactorAuthJsonObject json)
    {
        var user = await _usermanager.FindByNameAsync(json.userName);
        if (json.token == user._2faToken)
        {
            if (DateTime.Compare(DateTime.Now, (DateTime)user._2faExpDate) <= 0)
            {
                var tokenOptions = await GenerateJwt(user);
                return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions), user });
            }
            return BadRequest("expired");
        }
        return BadRequest("wrong");
    }




    public class usernameJsonObject { public string userName { get; set; } }
    [HttpPost]
    [Route("mailToConfirmedAddress")]
    public async Task<ActionResult> MailToConfirmedAddress([FromBody] usernameJsonObject json)
    {
        var user = await _usermanager.FindByNameAsync(json.userName);
        if (user == null)
        {
            return BadRequest("noUser");
        }
        if (!user.EmailConfirmed)
        {
            return BadRequest("noEmail");
        }
        await SendTokenToEmail(user);
        return Ok();
    }




    [HttpPost]
    [Route("mailToUnconfirmedAddress")]
    public async Task<ActionResult> MailToUnconfirmedAddress([FromBody] usernameJsonObject json)
    {
        var user = await _usermanager.FindByNameAsync(json.userName);
        if (user == null)
        {
            return BadRequest("noUser");
        }
        await SendTokenToEmail(user);
        return Ok();
    }



    public class captchaResponseJsonObject { public string responseToken { get; set; } }
    public class ApiResponse
    {
        public bool success { get; set; }
        public string challenge_ts { get; set; }
        public string hostname { get; set; }
    }




    [HttpPost]
    [Route("ReCaptcha")]
    public async Task<ActionResult> test([FromBody] captchaResponseJsonObject _captchaResponse)
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


    //Deze methode controleert of een SWT Token niet verlopen is. En of een kwaardaardige persoon de token niet heeft aangepast.
    //De methode is beschikbaar onder de route "validateSwtToken" en is beveiligd met de Authorize-attribuut,
    //dit betekent dat alleen gebruikers met een geldige swt token kunnen toegang krijgen tot deze route.
    //De methode retourneert een "Ok" HTTP-statuscode, dit betekent dat de aanvraag succesvol is afgerond en dat er geen informatie teruggegeven hoeft te worden.
    [HttpGet]
    [Route("validateSwtToken")]
    [Authorize]
    public ActionResult validateSwtToken()
    {

        return Ok();
    }



    private async Task SendTokenToEmail(ApplicationUser user)
    {
        var token = await Create2FaToken(user);
        await emailsender.SendEmail($"Uw toegangscode is: {token} De code verloopt na 30 minuten", "drampersad740@gmail.com");
        //await emailsender.SendEmail($"Uw toegangscode is: {token} De code verloopt na 30 minuten", user.Email);
    }


    private async Task<string> Create2FaToken(ApplicationUser user)
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

    //De methode genereerd SWT-Token Options en stuurt deze terug. Zodat de methode de swt-token kan signen met deze options.
    //De signature is het resultaat van het hashen van de header en payload met een geheime sleutel.
    //Dit zorgt ervoor dat alleen partijen met de juiste sleutel het token kunnen verifiëren en de claims kunnen lezen.
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
}