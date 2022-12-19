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
        // 

        builder.Entity<Zaal>.ToTable("Zaal")
    }


    DbSet<Zaal> Zaal {get; set;}
    DbSet<Voorstelling> Voorstelling {get; set;}
    DbSet<Optreden> Optreden {get; set;}
    DbSet<Artiest> Artiest {get; set;}
    DbSet<ArtiestenGroep> ArtiestGroep {get; set;}
}
