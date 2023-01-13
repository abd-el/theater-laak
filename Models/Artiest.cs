using theater_laak.Data.Migrations;

namespace theater_laak.Models;

public class Artiest : ApplicationUser
{
    public int? ArtiestenGroepId {get; set;} // FK naar ArtiestenGroep.ArtiestenGroepId;
    public ArtiestenGroep? ArtiestenGroep {get; set;}
    public List<Optreden> Optredens {get; set;}
}