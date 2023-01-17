using Microsoft.EntityFrameworkCore.Migrations.Operations;

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
    
    public List<Optreden> Optredens { get; set; }

    public List<Stoel> Stoelen { get; set; }

    public bool AddRij(int aantalStoelen, int rang, int rij)
    {
        if (rang < 1 || rang > 3) {
            return false;
        } else {
            for (int i = 0; i < aantalStoelen; i++) {
                Stoelen.Add(new Stoel() { 
                    Rang = rang,
                    Rij = rij
                });
            }
            return true;
        }
    }

    public bool AddRang(int aantalStoelen, int aantalRijen, int rang)
    {
        if (rang < 1 || rang > 3) {
            return false;
        } else {
            for (int i = 0; i < aantalRijen; i++) {
                AddRij(aantalStoelen, rang, i);
            }
            return true;
        }
    }
}

