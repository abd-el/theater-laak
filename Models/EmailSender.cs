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
    public async Task SendEmail(string userEmail)
    {

        // var body = "uw toegangstoken: 477520, voer dit aub in op de website";
        // var email = new MimeMessage();
        // email.From.Add(MailboxAddress.Parse("itsnublolse@gmail.com"));
        // email.To.Add(MailboxAddress.Parse("21052506@student.hhs.nl"));
        // email.Subject = "Test Email Subject";
        // email.Body = new TextPart(TextFormat.Html) { Text = body };
    
        // using var smtp = new SmtpClient();
        // smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
        // smtp.Authenticate("drampersad740@gmail.com", "xxxxxxx");
        // smtp.Send(email);
        // smtp.Disconnect(true);
    }

}