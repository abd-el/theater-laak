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

        // Class Admin
        builder.Entity<Admin>()
        .Property(admin => admin.Achternaam)
        .IsRequired();

        builder.Entity<Admin>()
        .Property(admin => admin.IP)
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

        // create a foreign key constraint between Voorstelling.ZaalId and Zaal.ZaalId
        builder.Entity<Voorstelling>()
        .HasOne<Zaal>(v => v.Zaal)
        .WithMany(z => z.Voorstellingen)
        .HasForeignKey(v => v.ZaalId)
        .IsRequired(false);

        // Class Ticket
        
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
