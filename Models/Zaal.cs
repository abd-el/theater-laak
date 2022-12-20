namespace theater_laak.Models;

public class Zaal
{
    public int AantalStoelen {get; set;}
    public int EersteRangAantalStoelen {get; set;}
    public int? TweedeRangAantalStoelen {get; set;}
    public int? DerdeRangAantalStoelen {get; set;}
    public int ZaalId {get; set;}
    public Boolean Klein {get; set;}
}

