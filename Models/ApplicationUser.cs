using Microsoft.AspNetCore.Identity;

namespace theater_laak.Models;

public class ApplicationUser : IdentityUser
{
    public string? Voornaam { get; set; }
    public string Achternaam { get; set; }
    public DateOnly? GeboorteDatum { get; set; }
    public string? Adres { get; set; }
    public string? Geslacht { get; set; } // Man / Vrouw / Anders
    public bool Nieuwsbrief { get; set; }
    public IEnumerable<Ticket> Tickets {get; set;}
    public override string Id { get; set; }
    public IEnumerable<Donatie> Donaties {get; set;}
}
