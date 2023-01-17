namespace theater_laak.Models;

public class Optreden {
    public int OptredenId {get; set;}
    public double Prijs {get; set;}
    public DateTime DatumTijdstip {get; set;}
    public int? ArtiestenGroepId {get; set;}
    public string? ArtiestId {get; set;}
    public Artiest? Artiest {get; set;}
    public ArtiestenGroep? ArtiestenGroep {get; set;}
    public int VoorstellingId {get; set;}
    public Voorstelling? Voorstelling {get; set;}
    public Boolean BegunstigersExclusief {get; set;}
    public List<Ticket> Tickets {get; set;}
    public Boolean? Bevestigd {get; set;}
    public int ZaalId {get; set;}
    public Zaal? Zaal {get; set;}
}