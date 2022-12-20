namespace theater_laak.Models;

public class Artiest {
    public int ArtiestId {get; set;}
    public string? Voornaam {get; set;}
    public string Achternaam {get; set;}
    public DateOnly? GeboorteDatum {get; set;}
    public string? Telefoonnummer {get; set;}
    public string? Email {get; set;}
    public string? Geslacht {get; set;} // Man / Vrouw / Anders
    public int? ArtiestenGroepId {get; set;} // FK naar ArtiestenGroep.ArtiestenGroepId;
    public ArtiestenGroep ArtiestenGroep {get; set;}
    
}