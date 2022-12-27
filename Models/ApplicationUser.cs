using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace theater_laak.Models;

public class ApplicationUser : IdentityUser
{
    public string? Voornaam { get; set; }
    public string Achternaam { get; set; }
    public DateOnly? GeboorteDatum { get; set; }
    public string? Adres { get; set; }
    public string? Geslacht { get; set; } // Man / Vrouw / Anders
    private string _EmailVoorkeur;
    public string EmailVoorkeur {
        get { return _EmailVoorkeur; }
        set {
            if (value == "nieuwsbrief" || value == "belangrijke informatie" || value == "geen") {
                _EmailVoorkeur = value;
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
