namespace theater_laak.Models;

public class Medewerker : ApplicationUser
{
    public string IP { get; set; }
    public string BankGegevens { get; set; }
    public DateTime DienstDatum { get; set; }
    public Double Loon { get; set; }
}