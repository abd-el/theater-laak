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
        // Controleer op:
        // Primary key
        // Foreign key
        // Required fields

        // Class Artiest
        builder.Entity<Artiest>()
        .Property(artiest => artiest.Achternaam)
        .IsRequired();

        builder.Entity<Artiest>()
        .Property(artiest => artiest.Telefoonnummer)
        .IsRequired();

        builder.Entity<Artiest>()
        .HasOne(artiest => artiest.ArtiestenGroep)
        .WithMany(artiestenGroep => artiestenGroep.Artiesten)
        .HasForeignKey(artiest => artiest.ArtiestenGroepId);

        // Class ArtiestenGroep
        builder.Entity<ArtiestenGroep>()
        .Property(artiestenGroep => artiestenGroep.Naam)
        .IsRequired();

        builder.Entity<ArtiestenGroep>()
        .Property(artiestenGroep => artiestenGroep.Email)
        .IsRequired();
        

        // Class Optreden
        builder.Entity<Optreden>()
        .Property(optreden => optreden.Prijs)
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
        .Property(zaal => zaal.Klein)
        .IsRequired();

        builder.Entity<Zaal>()
        .Property(Zaal => Zaal.EersteRangAantalStoelen)
        .IsRequired();
    }


    DbSet<Zaal> Zaal {get; set;}
    DbSet<Voorstelling> Voorstelling {get; set;}
    DbSet<Optreden> Optreden {get; set;}
    DbSet<Artiest> Artiest {get; set;}
    DbSet<ArtiestenGroep> ArtiestGroep {get; set;}
}
