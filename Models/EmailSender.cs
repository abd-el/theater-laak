using System.ComponentModel;
using System.Net;
using System.Net.Mail;
using FluentEmail.Smtp;

namespace theater_laak.Models;

public class EmailSender
{

    public void SendCompletedCallback(object sender, AsyncCompletedEventArgs e)
    {
        


    }

    public async Task SendEmail(string email)
    {
        // var smtpClient = new SmtpClient("https://mandrillapp.com/api/1.0/users/ping")
        // {
        //     //Port = 0,
        //     Credentials = new NetworkCredential("", ""),
        //     EnableSsl = true,
            
        // };
        // var mailmsg = new MailMessage{
        // };
    // await smtpClient.SendMailAsync("from", "recipient", "subject", "body");

    var sender = new SmtpSender(() => new SmtpClient("https://mandrillapp.com/api/1.0/users/ping")
    {
        EnableSsl = true
    });
    }

}