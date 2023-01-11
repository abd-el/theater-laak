using System.Security.Cryptography.X509Certificates;

namespace theater_laak.Models;

public class ArtiestenGroep {
    public int ArtiestenGroepId {get; set;}
    public string GroepsNaam {get; set;}
    public string? GroepsEmail {get; set;}
    public List<Artiest> Artiesten {get; set;}

    public ArtiestenGroep(string groepsNaam) {
        this.GroepsNaam = groepsNaam;
        this.Artiesten = new List<Artiest>();
    }
}

public class ArtiestenGroepJsonGegevens {
    public string groepsNaam {get; set;}
    public string? groepsEmail {get; set;}
    public ArtiestenGroepJsonGegevens(string groepsNaam, string? groepsEmail) {
        this.groepsNaam = groepsNaam;
        this.groepsEmail = groepsEmail;
    }
}

public class SluitAanGroepJson {
    public int groepsId {get; set;}
    public SluitAanGroepJson(int groepsId) {
        this.groepsId = groepsId;
    }
}