using Microsoft.AspNetCore.Identity;

namespace theater_laak.Models;

public class Donatie {
    public int DonatieId {get; set;}
    public DateTime Datum {get; set;}
    public double TotaalBedrag {get; set;}
    public ApplicationUser? ApplicationUser {get; set;}

    public string? UserId {get; set;}
    public string? Bericht {get; set;}
}

public class DonatieJsonGegevens {
    public string hoeveelheid {get; set;}
    public string bericht {get; set;}
    public Boolean anoniem {get; set;}
}

public class DonatieAutorisatieJsonGegevens {
    public string ikDoneerToken {get; set;}
}