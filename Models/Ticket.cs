namespace theater_laak.Models;

public class Ticket
{

    public int TicketID { get; set; }
    public string QR { get; set; }
    private string _UserID;
    public string? UserID //FK naar APPLICATIONUSER(ASPNETUSER)
    {
        get
        {
            return _UserID;
        }

        set
        {
            _UserID = ApplicationUser.Id;
        }
    }
    public int OptredenId { get; set; } //FK naar OPTREDEN
    public string StoelId { get; set; } //FK naar STOEL
    public Stoel? Stoel { get; set; }
    public Optreden? Optreden { get; set; }
    public ApplicationUser? ApplicationUser { get; set; }
}