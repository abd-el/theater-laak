namespace theater_laak.Models;

public class Zaal
{
    public int AantalStoelen {get; set;}
    // onder hoe het hoort te zijn
    // {
    //     get
    //     {
    //         return Stoelen.Count();
    //     }
    //     private set
    //     {
            
    //     }
    // }
    public int ZaalId { get; set; }
    private string? _Grootte;
    public string? Grootte
    {
        get
        {
            return _Grootte;
        }
        private set
        {
            if (AantalStoelen == 30)
            {
                value = "Ruimte";
            }
            else if (AantalStoelen < 150 && AantalStoelen > 0)
            {
                value = "Klein";
            }
            else if (AantalStoelen > 150 && AantalStoelen > 0)
            {
                value = "Groot";
            }
            else
            {
                value = "Onbekend";
            }

            _Grootte = value;
        }
    }
    public IEnumerable<Stoel> Stoelen { get; set; }
    public IEnumerable<Optreden> Optredens { get; set; }
}

