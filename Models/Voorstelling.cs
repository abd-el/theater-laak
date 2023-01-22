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