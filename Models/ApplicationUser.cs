﻿using Microsoft.AspNetCore.Identity;

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
    public string Discriminator {get; set;}
}