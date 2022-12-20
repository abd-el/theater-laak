namespace theater_laak.Models;

public class Optreden {
    public int OptredenId {get; set;}
    public double Prijs {get; set;}
    public DateTime DatumTijdstip {get; set;}
    public int? ArtiestenGroepId {get; set;}
    public int? ArtiestId {get; set;}
    public int VoorstellingId {get; set;}
}