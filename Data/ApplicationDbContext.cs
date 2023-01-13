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


    // Class ArtiestenGroep
        builder.Entity<ArtiestenGroep>()
        .Property(artiestenGroep => artiestenGroep.GroepsNaam)
        .IsRequired();

        builder.Entity<ArtiestenGroep>()
        .HasIndex(artiestenGroep => artiestenGroep.GroepsNaam)
        .IsUnique();

        builder.Entity<ArtiestenGroep>()
        .Property(artiestenGroep => artiestenGroep.GroepsEmail)
        .IsRequired();

        builder.Entity<ArtiestenGroep>()
        .HasIndex(artiestenGroep => artiestenGroep.GroepsEmail)
        .IsUnique();

    // Class Optreden
        builder.Entity<Optreden>() //Table Name en Primary Key instellen
        .ToTable("Optredens")
        .HasKey(o => o.OptredenId);

        builder.Entity<Optreden>()
        .Property(optreden => optreden.Prijs)
        .HasColumnType("decimal(18,2)")
        .IsRequired();

        builder.Entity<Optreden>()
        .Property(optreden => optreden.BegunstigersExclusief)
        .IsRequired();

        builder.Entity<Optreden>()
        .Property(optreden => optreden.VoorstellingId)
        .IsRequired();

        builder.Entity<Optreden>()
        .Property(optreden => optreden.DatumTijdstip)
        .HasColumnType("datetime")
        .IsRequired();


    // Class Voorstelling
        builder.Entity<Voorstelling>() //Table Name en Primary Key instellen
        .ToTable("Voorstellingen")
        .HasKey(v => v.VoorstellingId);

        builder.Entity<Voorstelling>()
        .Property(voorstelling => voorstelling.Afbeelding)
        .IsRequired();

        builder.Entity<Voorstelling>()
        .Property(voorstelling => voorstelling.Titel)
        .IsRequired();

        builder.Entity<Voorstelling>()
        .HasIndex(voorstelling => voorstelling.Titel)
        .IsUnique();

        builder.Entity<Voorstelling>()
        .Property(voorstelling => voorstelling.Beschrijving)
        .IsRequired();

        builder.Entity<Voorstelling>()
        .Property(voorstelling => voorstelling.TijdsduurInMinuten)
        .IsRequired();


    // Class Zaal
        builder.Entity<Zaal>() //Table Name en Primary Key instellen
        .ToTable("Zalen")
        .HasKey(z => z.ZaalId);


    // Class Ticket
        builder.Entity<Ticket>() //Table Name en Primary Key instellen
        .ToTable("Tickets")
        .HasKey(t => t.TicketID);

        builder.Entity<Ticket>()
        .Property(ticket => ticket.QR)
        .IsRequired();


    // Class Donatie
        builder.Entity<Donatie>()
        .ToTable("Donaties")
        .HasKey(d => d.DonatieId);

        builder.Entity<Donatie>()
        .Property(Donatie => Donatie.Datum)
        .HasColumnType("datetime")
        .IsRequired();

        builder.Entity<Donatie>()
        .Property(Donatie => Donatie.TotaalBedrag)
        .HasColumnType("decimal(18,2)")
        .IsRequired();


    // Class Stoel
        builder.Entity<Stoel>()
        .ToTable("Stoelen")
        .HasKey(s => s.Id);

        builder.Entity<Stoel>()
        .Property(s => s.Rang)
        .IsRequired();


    //-------------- * FOREIGN KEY's * --------------
    
    // Artiest FK naar ArtiestenGroep
        builder.Entity<Artiest>() 
        .HasOne<ArtiestenGroep>(a => a.ArtiestenGroep)
        .WithMany(ag => ag.Artiesten)
        .HasForeignKey(a => a.ArtiestenGroepId)
        .HasConstraintName("FK_Artiest_ArtiestenGroep_1");

        builder.Entity<ArtiestenGroep>()
        .HasMany<Artiest>(ag => ag.Artiesten)
        .WithOne(a => a.ArtiestenGroep)
        .HasForeignKey(a => a.ArtiestenGroepId)
        .HasConstraintName("FK_Artiest_ArtiestenGroep_2");
    
    // Donatie FK naar ApplicationUser
        builder.Entity<Donatie>()
        .HasOne<ApplicationUser>(d => d.ApplicationUser)
        .WithMany(au => au.Donaties)
        .HasForeignKey(d => d.UserId)
        .HasConstraintName("FK_Donatie_ApplicationUser_1");

        builder.Entity<ApplicationUser>()
        .HasMany<Donatie>(au => au.Donaties)
        .WithOne(d => d.ApplicationUser)
        .HasForeignKey(d => d.UserId)
        .HasConstraintName("FK_Donatie_ApplicationUser_2");

    // Ticket FK naar ApplicationUser
        builder.Entity<Ticket>()
        .HasOne<ApplicationUser>(t => t.ApplicationUser)
        .WithMany(au => au.Tickets)
        .HasForeignKey(t => t.UserID)
        .HasConstraintName("FK_Ticket_ApplicationUser_1");

        builder.Entity<ApplicationUser>()
        .HasMany<Ticket>(au => au.Tickets)
        .WithOne(t => t.ApplicationUser)
        .HasForeignKey(t => t.UserID)
        .HasConstraintName("FK_Ticket_ApplicationUser_2");
        
    // Ticket FK naar Optreden
        builder.Entity<Ticket>()
        .HasOne<Optreden>(t => t.Optreden)
        .WithMany(o => o.Tickets)
        .HasForeignKey(t => t.OptredenId)
        .HasConstraintName("FK_Ticket_Optreden_1");

        builder.Entity<Optreden>()
        .HasMany<Ticket>(o => o.Tickets)
        .WithOne(t => t.Optreden)
        .HasForeignKey(t => t.OptredenId)
        .HasConstraintName("FK_Ticket_Optreden_2");

    // Ticket FK naar Stoel
        builder.Entity<Ticket>()
        .HasOne<Stoel>(t => t.Stoel)
        .WithMany(s => s.Tickets)
        .HasForeignKey(t => t.StoelId)
        .HasConstraintName("FK_Ticket_Stoel_1");

        builder.Entity<Stoel>()
        .HasMany<Ticket>(s => s.Tickets)
        .WithOne(t => t.Stoel)
        .HasForeignKey(t => t.StoelId)
        .HasConstraintName("FK_Ticket_Stoel_2");

    // Optreden FK naar Voorstelling
        builder.Entity<Optreden>()
        .HasOne<Voorstelling>(o => o.Voorstelling)
        .WithMany(v => v.Optredens)
        .HasForeignKey(o => o.VoorstellingId)
        .HasConstraintName("FK_Optreden_Voorstelling_1");

        builder.Entity<Voorstelling>()
        .HasMany<Optreden>(v => v.Optredens)
        .WithOne(o => o.Voorstelling)
        .HasForeignKey(o => o.VoorstellingId)
        .HasConstraintName("FK_Optreden_Voorstelling_2");

    // Stoel FK naar Zaal    
        builder.Entity<Stoel>()
        .HasOne<Zaal>(s => s.Zaal)
        .WithMany(z => z.Stoelen)
        .HasForeignKey(s => s.ZaalId)
        .HasConstraintName("FK_Stoel_Zaal_1");

        builder.Entity<Zaal>()
        .HasMany<Stoel>(z => z.Stoelen)
        .WithOne(s => s.Zaal)
        .HasForeignKey(s => s.ZaalId)
        .HasConstraintName("FK_Stoel_Zaal_2");

    // Optreden FK naar Zaal    
        builder.Entity<Optreden>()
        .HasOne<Zaal>(v => v.Zaal)
        .WithMany(z => z.Optredens)
        .HasForeignKey(v => v.ZaalId)
        .HasConstraintName("FK_Optreden_Zaal_1");

        builder.Entity<Zaal>()
        .HasMany<Optreden>(z => z.Optredens)
        .WithOne(o => o.Zaal)
        .HasForeignKey(o => o.ZaalId)
        .HasConstraintName("FK_Optreden_Zaal_2");

    // Optreden FK naar Artiest
        builder.Entity<Optreden>()
        .HasOne<Artiest>(o => o.Artiest)
        .WithMany(a => a.Optredens)
        .HasForeignKey(o => o.ArtiestId)
        .HasConstraintName("FK_Optreden_Artiest_1")
        .IsRequired(false);

        builder.Entity<Artiest>()
        .HasMany<Optreden>(a => a.Optredens)
        .WithOne(o => o.Artiest)
        .HasForeignKey(o => o.ArtiestId)
        .HasConstraintName("FK_Optreden_Artiest_2");

    // Optreden FK naar Artiestengroep
        builder.Entity<Optreden>()
        .HasOne<ArtiestenGroep>(o => o.ArtiestenGroep)
        .WithMany(ag => ag.Optredens)
        .HasForeignKey(o => o.ArtiestenGroepId)
        .HasConstraintName("FK_Optreden_Artiestengroep_1")
        .IsRequired(false);

        builder.Entity<ArtiestenGroep>()
        .HasMany<Optreden>(ag => ag.Optredens)
        .WithOne(o => o.ArtiestenGroep)
        .HasForeignKey(o => o.ArtiestenGroepId)
        .HasConstraintName("FK_Optreden_Artiestengroep_2");
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
