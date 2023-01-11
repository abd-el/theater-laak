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

public class DonatieCreatieJsonGegevens {
    public string hoeveelheid {get; set;}
    public string bericht {get; set;}
    public Boolean anoniem {get; set;}

    public DonatieCreatieJsonGegevens (string hoeveelheid, string bericht, Boolean anoniem) {
        this.hoeveelheid = hoeveelheid;
        this.bericht = bericht;
        this.anoniem = anoniem;
    }
}

public class DonatieAutorisatieJsonGegevens {
    public string ikDoneerToken {get; set;}

    public DonatieAutorisatieJsonGegevens(string ikDoneerToken){
        this.ikDoneerToken = ikDoneerToken;
    }
}

public class DonatieJsonGegevens {
    public int donatieId {get; set;}
    public DateTime datum {get; set;}
    public double bedrag {get; set;}
    public string? userId {get; set;}
    public string? bericht {get; set;}

    public DonatieJsonGegevens(int donatieId, DateTime datum, double bedrag, string? userId, string? bericht){
        this.donatieId = donatieId;
        this.datum = datum;
        this.bedrag = bedrag;
        this.userId = userId;
        this.bericht = bericht;
    }
}