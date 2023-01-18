using Microsoft.AspNetCore.Identity;

namespace theater_laak.Models;

public class ApplicationUser : IdentityUser
{
    public string? Voornaam { get; set; }
    public string Achternaam { get; set; }
    public string? GeboorteDatum { get; set; }
    public string? Adres { get; set; }
    public string? Geslacht { get; set; } // Man / Vrouw / Anders
    public string? Telefoonnummer { get; set; }
    public string? Password { get; set; }
    public string? _2faToken { get; set; }
    public DateTime? _2faExpDate { get; set; }
    private string _Emailvoorkeur;
    public string Emailvoorkeur
    {
        get { return _Emailvoorkeur; }
        set
        {
            if (value == "nieuws" || value == "belangrijk" || value == "geen")
            {
                _Emailvoorkeur = value;
            }
            else
            {
                throw new System.ArgumentException("Emailvoorkeur moet 'nieuwsbrief', 'belangrijke informatie' of 'geen' zijn.");
            }
        }
    }
    public IEnumerable<Ticket> Tickets { get; set; }
    public override string Id { get; set; }
    public IEnumerable<Donatie> Donaties { get; set; }
    public string? IkDoneerToken { get; set; }

    public int? FailedAttempts { get; set; }
    public bool? lockout { get; set; }
    public DateTime? unlockDate { get; set; }
}

public class AccountInstellingenJsonGegevens
{
    public string voornaam { get; set; }
    public string achternaam { get; set; }
    public string email { get; set; }
    public string telefoonnummer { get; set; }
    public string geboorteDatum { get; set; }
    public string emailvoorkeur { get; set; }
    public string geslacht { get; set; }

    public bool EmailConfirmed {get;set;}
    public bool TwoFactorEnabled {get;set;}

    // public AccountInstellingenJsonGegevens(string voornaam, string achternaam, string email, string telefoonnummer, string geboorteDatum, string emailvoorkeur, string geslacht)
    // {
    //     this.voornaam = voornaam;
    //     this.achternaam = achternaam;
    //     this.email = email;
    //     this.telefoonnummer = telefoonnummer;
    //     this.geboorteDatum = geboorteDatum;
    //     this.emailvoorkeur = emailvoorkeur;
    //     this.geslacht = geslacht;
    // }
}

public class VeranderWachtwoordJsonGegevens
{
    public string huidigWachtwoord { get; set; }
    public string nieuwWachtwoord { get; set; }

    public VeranderWachtwoordJsonGegevens(string huidigWachtwoord, string nieuwWachtwoord)
    {
        this.huidigWachtwoord = huidigWachtwoord;
        this.nieuwWachtwoord = nieuwWachtwoord;
    }

    public class VeranderVergetenWachtwoordJson
    {
        public string nieuwWachtwoord { get; set; }
    }
}