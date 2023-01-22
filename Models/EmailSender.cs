using System.ComponentModel;
using System.Net;
using System.Security.Authentication;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace theater_laak.Models;

public class EmailSender
{
    //Je antivirus of firewall kan hier een exception veroorzaken.
    public async Task SendEmail( string tekst, string userEmail )
    {

        var body = tekst;
        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse("drampersad740@gmail.com"));
        email.To.Add(MailboxAddress.Parse(userEmail));
        email.Subject = "2-step tokenverificatie";
        email.Body = new TextPart(TextFormat.Plain) { Text = body };
    
        using var smtp = new SmtpClient();
        await smtp.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
        await smtp.AuthenticateAsync("drampersad740@gmail.com", "vidaxfxvnidmhjeo");
        await smtp.SendAsync(email);
        await smtp.DisconnectAsync(true);
    }

}