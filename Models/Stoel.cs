using theater_laak.Data;
using theater_laak.Data.Migrations;

namespace theater_laak.Models;
public class Stoel
{
    public int StoelId { get; set; }
    public int ZaalId { get; set; } //FK naar Zaal
    private int _rang;
    public int Rang
    {
        get
        {
            return _rang;
        }
        set
        {
            if(value < 1 || value > 3){
                value = -1;
            }
            _rang = value;
        }
    }
    public List<Ticket> Tickets { get; set; }
    public Zaal? Zaal { get; set; }
    public int Rij { get; set; }

    public bool IsBeschikbaar(int optredenId) {
        return this.Tickets.Any(t => t.OptredenId == optredenId);
    }
}