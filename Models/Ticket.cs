namespace theater_laak.Models;

public class Ticket
{

    public int TicketID { get; set; }
    public string QR { get; set; }
    private string _UsedID;
    public string? UserID //FK naar APPLICATIONUSER(ASPNETUSER)
    {
        get
        {
            return _UsedID;
        }

        set
        {
            _UsedID = ApplicationUser.Id;
        }
    }
    public int OptredenId { get; set; }
    public Optreden Optreden { get; set; }
    public ApplicationUser? ApplicationUser { get; set; }
}