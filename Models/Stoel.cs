namespace theater_laak.Models;
public class Stoel
{
    public string Id { get; set; }
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

    public IEnumerable<Ticket> Tickets { get; set; }

    public Zaal? Zaal { get; set; }
}