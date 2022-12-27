using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace theater_laak.Models;

public class ApplicationUser : IdentityUser
{
    public string? Voornaam { get; set; }
    public string Achternaam { get; set; }
    public string? GeboorteDatum { get; set; }
    public string? Adres { get; set; }
    public string? Geslacht { get; set; } // Man / Vrouw / Anders
    public string? Telefoonnummer { get; set; }
    private string _Emailvoorkeur;
    public string Emailvoorkeur {
        get { return _Emailvoorkeur; }
        set {
            if (value == "nieuwsbrief" || value == "belangrijke informatie" || value == "geen") {
                _Emailvoorkeur = value;
            } else {
                throw new System.ArgumentException("Emailvoorkeur moet 'nieuwsbrief', 'belangrijke informatie' of 'geen' zijn.");
            }
        }
    }
    public IEnumerable<Ticket> Tickets {get; set;}
    public override string Id { get; set; }
    public IEnumerable<Donatie> Donaties {get; set;}
    public string? IkDoneerToken {get; set;}
}
