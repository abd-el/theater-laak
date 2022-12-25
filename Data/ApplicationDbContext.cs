using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using theater_laak.Models;
using Microsoft.AspNetCore.Identity;

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
        .Property(zaal => zaal.ZaalId)
        .IsRequired();

        builder.Entity<Zaal>()
        .Property(zaal => zaal.Grootte)
        .IsRequired();

        builder.Entity<Zaal>()
        .Property(zaal => zaal.AantalStoelen)
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

        builder.Entity<Ticket>()
        .HasOne<Stoel>(ticket => ticket.Stoel)
        .WithMany(stoel => stoel.Tickets)
        .HasForeignKey(ticket => ticket.StoelId)
        .IsRequired();

        // Class Donatie
        builder.Entity<Donatie>()
        .HasOne<ApplicationUser>(d => d.ApplicationUser)
        .WithMany(a => a.Donaties)
        .HasForeignKey(d => d.UserId)
        .IsRequired(false);

        builder.Entity<Donatie>()
        .Property(Donatie => Donatie.Datum)
        .IsRequired();

        builder.Entity<Donatie>()
        .Property(Donatie => Donatie.TotaalBedrag)
        .IsRequired();

        // Class Stoel
        builder.Entity<Stoel>()
        .Property(s => s.Id)
        .IsRequired();

        builder.Entity<Stoel>()
        .Property(s => s.ZaalId)
        .IsRequired();

        builder.Entity<Stoel>()
        .Property(s => s.Rang)
        .IsRequired();

        builder.Entity<Stoel>()
        .HasOne<Zaal>(stoel => stoel.Zaal)
        .WithMany(zaal => zaal.Stoelen)
        .HasForeignKey(stoel => stoel.ZaalId);
    }

    //Gebruiker-Systeem
    public DbSet<Admin> Admins { get; set; }
    public DbSet<Medewerker> Medewerkers { get; set; }
    public DbSet<Klant> Klanten { get; set; }
    public DbSet<Artiest> Artiesten { get; set; }
    public DbSet<ArtiestenGroep> ArtiestGroepen { get; set; }

    //Programmering-Systeem 
    public DbSet<Zaal> Zalen { get; set; }
    public DbSet<Voorstelling> Voorstellingen { get; set; }
    public DbSet<Optreden> Optredens { get; set; }
    
    //Doneer-Systeem
    public DbSet<Donatie> Donaties { get; set; }
    
    //Ticket-Systeem
    public DbSet<Ticket> Tickets { get; set; }
}
