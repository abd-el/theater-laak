namespace theater_laak.Models;

public class Zaal
{
    private int _AantalStoelen;
    public int AantalStoelen
    {
        get
        {
            return _AantalStoelen;
        }
        set
        {
            if (EersteRangAantalStoelen > 0 || TweedeRangAantalStoelen > 0 || DerdeRangAantalStoelen > 0)
            {
                value = (EersteRangAantalStoelen + TweedeRangAantalStoelen + DerdeRangAantalStoelen);
            }
            else if (EersteRangAantalStoelen == 0 && TweedeRangAantalStoelen == 0 && DerdeRangAantalStoelen == 0)
            {

            }

            _AantalStoelen = value;
        }
    }
    public int EersteRangAantalStoelen { get; set; }
    public int TweedeRangAantalStoelen { get; set; }
    public int DerdeRangAantalStoelen { get; set; }
    public int ZaalId { get; set; }
    public string _Grootte;
    public string Grootte
    {
        get
        {
            return _Grootte;
        }
        private set
        {
            if (EersteRangAantalStoelen == 0 && TweedeRangAantalStoelen == 0 && DerdeRangAantalStoelen == 0 && AantalStoelen == 30)
            {
                value = "Ruimte";
            }
            else if (EersteRangAantalStoelen > 0 || TweedeRangAantalStoelen > 0 || DerdeRangAantalStoelen > 0 && AantalStoelen < 150)
            {
                value = "Klein";
            }
            else if (EersteRangAantalStoelen > 0 || TweedeRangAantalStoelen > 0 || DerdeRangAantalStoelen > 0 && AantalStoelen > 150)
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

