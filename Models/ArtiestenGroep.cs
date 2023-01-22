using System.Security.Cryptography.X509Certificates;

namespace theater_laak.Models;

public class ArtiestenGroep {
    public int ArtiestenGroepId {get; set;}
    public string GroepsNaam {get; set;}
    public string? GroepsEmail {get; set;}
    public List<Artiest> Artiesten {get; set;}
    public List<Optreden> Optredens {get; set;}

    public ArtiestenGroep(string groepsNaam) {
        this.GroepsNaam = groepsNaam;
        this.Artiesten = new List<Artiest>();
    }
}