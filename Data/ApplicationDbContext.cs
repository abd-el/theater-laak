using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using theater_laak.Models;

namespace theater_laak.Data;

public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Controleer op:
        // Primary key
        // Foreign key
        // Required fields

        // Class ApplicationUser
        builder.Entity<ApplicationUser>()
        .Property(user => user.Email)
        .IsRequired();

        builder.Entity<ApplicationUser>()
        .Property(user => user.PasswordHash)
        .IsRequired();

        // Class Medewerker
        builder.Entity<Medewerker>()
        .Property(medewerker => medewerker.Achternaam)
        .IsRequired();

        builder.Entity<Medewerker>()
        .Property(medewerker => medewerker.IP)
        .IsRequired();

        builder.Entity<Medewerker>()
        .Property(medewerker => medewerker.BankGegevens)
        .IsRequired();

        builder.Entity<Medewerker>()
        .Property(medewerker => medewerker.DienstDatum)
        .IsRequired();

        builder.Entity<Medewerker>()
        .Property(medewerker => medewerker.Loon)
        .IsRequired();

        // Class Artiest
        builder.Entity<Artiest>()
        .Property(artiest => artiest.Achternaam)
        .IsRequired();

        builder.Entity<Artiest>()
        .HasOne<ArtiestenGroep>(a => a.ArtiestenGroep)
        .WithMany(artiestenGroep => artiestenGroep.Artiesten)
        .HasForeignKey(a => a.ArtiestenGroepId)
        .IsRequired(false);

        // Class ArtiestenGroep
        builder.Entity<ArtiestenGroep>()
        .Property(artiestenGroep => artiestenGroep.GroepsNaam)
        .IsRequired();

        builder.Entity<ArtiestenGroep>()
        .Property(artiestenGroep => artiestenGroep.GroepsEmail)
        .IsRequired();

        // Class Optreden
        builder.Entity<Optreden>()
        .Property(optreden => optreden.Prijs)
        .IsRequired();

        builder.Entity<Optreden>()
        .HasOne<Voorstelling>(o => o.Voorstelling)
        .WithMany(v => v.Optredens)
        .HasForeignKey(o => o.VoorstellingId)
        .IsRequired(false);

        builder.Entity<Optreden>()
        .Property(optreden => optreden.BegunstigersExclusief)
        .IsRequired();

        // Class Voorstelling
        builder.Entity<Voorstelling>()
        .Property(voorstelling => voorstelling.Titel)
        .IsRequired();

        // Class Zaal
        builder.Entity<Zaal>()
        .Property(zaal => zaal.AantalStoelen)
        .IsRequired();

        builder.Entity<Zaal>()
        .Property(Zaal => Zaal.EersteRangAantalStoelen)
        .IsRequired();

        builder.Entity<Zaal>()
        .Property(Zaal => Zaal.TweedeRangAantalStoelen)
        .IsRequired();

        builder.Entity<Zaal>()
        .Property(Zaal => Zaal.DerdeRangAantalStoelen)
        .IsRequired();

        // create a foreign key constraint between Voorstelling.ZaalId and Zaal.ZaalId
        builder.Entity<Voorstelling>()
        .HasOne<Zaal>(v => v.Zaal)
        .WithMany(z => z.Voorstellingen)
        .HasForeignKey(v => v.ZaalId)
        .IsRequired(false);

        // Class Ticket
        builder.Entity<Ticket>()
        .Property(ticket => ticket.QR)
        .IsRequired();

        builder.Entity<Ticket>()
        .Property(ticket => ticket.TicketID)
        .IsRequired();

        builder.Entity<Ticket>()
        .HasOne<ApplicationUser>(ticket => ticket.ApplicationUser)
        .WithMany(user => user.Tickets)
        .HasForeignKey(ticket => ticket.UserID)
        .IsRequired(false);

        builder.Entity<Ticket>()
        .HasOne<Optreden>(ticket => ticket.Optreden)
        .WithMany(optreden => optreden.Tickets)
        .HasForeignKey(ticket => ticket.OptredenId)
        .IsRequired();
    }

    //Gebruiker-Systeem
    DbSet<Admin> Admins { get; set; }
    DbSet<Medewerker> Medewerkers { get; set; }
    DbSet<Klant> Klanten { get; set; }
    DbSet<Artiest> Artiesten { get; set; }
    DbSet<ArtiestenGroep> ArtiestGroepen { get; set; }

    //Programmering-Systeem 
    DbSet<Zaal> Zalen { get; set; }
    DbSet<Voorstelling> Voorstellingen { get; set; }
    DbSet<Optreden> Optredens { get; set; }
    
    //Doneer-Systeem
    DbSet<Donatie> Donaties { get; set; }
    
    //Ticket-Systeem
    DbSet<Ticket> Tickets { get; set; }
}
