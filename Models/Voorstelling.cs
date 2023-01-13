namespace theater_laak.Models;

public class Voorstelling
{
    public int VoorstellingId {get; set;}
    public string Afbeelding {get; set;}
    public string Titel {get; set;}
    public string Beschrijving {get; set;}
    public int TijdsduurInMinuten {get; set;}
    public List<Optreden> Optredens {get; set;}

    public Voorstelling(string Afbeelding, string Titel, string Beschrijving, int TijdsduurInMinuten)
    {
        this.Afbeelding = Afbeelding;
        this.Titel = Titel;
        this.Beschrijving = Beschrijving;
        this.TijdsduurInMinuten = TijdsduurInMinuten;
        Optredens = new List<Optreden>();
    }
}

public class VoorstellingJsonGegevens {
    public string titel {get; set;}    
    public int tijdsduurInMinuten {get; set;}
    public string beschrijving { get; set; }
    public string imgUrl { get; set; }

    public VoorstellingJsonGegevens(string titel, int tijdsduurInMinuten, string beschrijving, string imgUrl)
    {
        this.titel = titel;
        this.tijdsduurInMinuten = tijdsduurInMinuten;
        this.beschrijving = beschrijving;
        this.imgUrl = imgUrl;
    }
}