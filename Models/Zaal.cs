using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace theater_laak.Models;

public class Zaal
{
    public int ZaalId { get; set; }
    
    public List<Optreden> Optredens { get; set; }

    public List<Stoel> Stoelen { get; set; } = new List<Stoel>();

    public bool AddRij(int aantalStoelen, int rang, int rij) {
        if (rang < 1 || rang > 3) {
            return false;
        } else {
            for (int i = 0; i < aantalStoelen; i++) {
                this.Stoelen.Add(new Stoel() { 
                    Rang = rang,
                    Rij = rij
                });
            }
            return true;
        }
    }

    public bool AddRang(int aantalStoelen, int aantalRijen, int rang) {
        if (rang < 1 || rang > 3) {
            return false;
        } else {
            for (int i = 1; i < aantalRijen + 1; i++) {
                AddRij(aantalStoelen / aantalRijen, rang, i);
            }
            return true;
        }
    }
}

