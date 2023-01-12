// using System.ComponentModel;
// using System.Net;
// using System.Net.Mail;

// namespace theater_laak.Models;

// public class EmailSender
// {

//     public void SendCompletedCallback(object sender, AsyncCompletedEventArgs e)
//     {
//         string token = 


//     }

//     public async Task SendEmail(string email)
//     {
//         var smtpClient = new SmtpClient()
//         {
//             Port = 0,
//             Credentials = new NetworkCredential("", ""),
//             EnableSsl = true,
//         };
        
//         await smtpClient.SendMailAsync("from", "recipient", "subject", "body");
//     }

// }