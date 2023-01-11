namespace theater_laak.Models;

public class ArtiestenGroep {
    public int ArtiestenGroepId {get; set;}
    public string GroepsNaam {get; set;}
    public string? GroepsEmail {get; set;}
    public IEnumerable<Artiest> Artiesten {get; set;}

    public ArtiestenGroep(string groepsNaam) {
        this.GroepsNaam = groepsNaam;
        this.Artiesten = new List<Artiest>();
    }
}