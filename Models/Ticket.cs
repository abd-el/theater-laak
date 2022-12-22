namespace theater_laak.Models;

public class Ticket{
    public Optreden optreden {get; set;}
    public int ticketID{get; set;}
    public ApplicationUser? applicationUser{get; set;}
    public string QR {get; set;}
}