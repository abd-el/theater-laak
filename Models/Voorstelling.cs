namespace theater_laak.Models;

public class Voorstelling
{
    public int VoorstellingId {get; set;}
    public string Titel {get; set;}
    public string Beschrijving {get; set;}
    public int TijdsduurInMinuten {get; set;}
    public IEnumerable<Optreden> Optredens {get; set;}
    public int ZaalId {get; set;}
    public Zaal Zaal {get; set;}
}

