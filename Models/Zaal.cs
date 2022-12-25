namespace theater_laak.Models;

public class Zaal
{
    public IEnumerable<Stoel> AantalStoelen { get; set; }

    public int ZaalId { get; set; }
    private string _Grootte;
    public string Grootte
    {
        get
        {
            return _Grootte;
        }
        private set
        {
            if (AantalStoelen.Count() == 30)
            {
                value = "Ruimte";
            }
            else if (AantalStoelen.Count() < 150 && AantalStoelen.Count() > 0)
            {
                value = "Klein";
            }
            else if (AantalStoelen.Count() > 150 && AantalStoelen.Count() > 0)
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
    public IEnumerable<Voorstelling> Voorstellingen { get; set; }
}

