namespace theater_laak.Models;

public class Artiest : ApplicationUser
{
    public int? ArtiestenGroepId {get; set;} // FK naar ArtiestenGroep.ArtiestenGroepId;
    public ArtiestenGroep? ArtiestenGroep {get; set;}   
}