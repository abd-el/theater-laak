namespace theater_laak.Models;

public class Ticket
{

    public int TicketId { get; set; }
    public string QR { get; set; }
    private string _UserId;
    public string? UserId //FK naar APPLICATIONUSER(ASPNETUSER)
    {
        get
        {
            return _UserId;
        }

        set
        {
            _UserId = ApplicationUser.Id;
        }
    }
    public int OptredenId { get; set; } //FK naar OPTREDEN
    public int StoelId { get; set; } //FK naar STOEL
    public Stoel? Stoel { get; set; }
    public Optreden? Optreden { get; set; }
    public ApplicationUser? ApplicationUser { get; set; }
    public bool Betaald { get; set; } = false;
    public DateTime AangemaaktOp { get; set; } = DateTime.Now;
}