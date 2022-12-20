namespace theater_laak.Models;

public class ArtiestenGroep {
    public int ArtiestenGroepId {get; set;}
    public string Naam {get; set;}
    public string Email {get; set;}
    public IEnumerable<Artiest> Artiesten {get; set;}
}