﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using theater_laak.Data;

#nullable disable

namespace theater_laak.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230117171730_stoel9")]
    partial class stoel9
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.8");

            modelBuilder.Entity("Duende.IdentityServer.EntityFramework.Entities.DeviceFlowCodes", b =>
                {
                    b.Property<string>("UserCode")
                        .HasMaxLength(200)
                        .HasColumnType("TEXT");

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasMaxLength(50000)
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("TEXT");

                    b.Property<string>("DeviceCode")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("Expiration")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("SessionId")
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<string>("SubjectId")
                        .HasMaxLength(200)
                        .HasColumnType("TEXT");

                    b.HasKey("UserCode");

                    b.HasIndex("DeviceCode")
                        .IsUnique();

                    b.HasIndex("Expiration");

                    b.ToTable("DeviceCodes", (string)null);
                });

            modelBuilder.Entity("Duende.IdentityServer.EntityFramework.Entities.Key", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("Algorithm")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("DataProtected")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsX509Certificate")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Use")
                        .HasColumnType("TEXT");

                    b.Property<int>("Version")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("Use");

                    b.ToTable("Keys");
                });

            modelBuilder.Entity("Duende.IdentityServer.EntityFramework.Entities.PersistedGrant", b =>
                {
                    b.Property<string>("Key")
                        .HasMaxLength(200)
                        .HasColumnType("TEXT");

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("ConsumedTime")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasMaxLength(50000)
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("Expiration")
                        .HasColumnType("TEXT");

                    b.Property<string>("SessionId")
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<string>("SubjectId")
                        .HasMaxLength(200)
                        .HasColumnType("TEXT");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.HasKey("Key");

                    b.HasIndex("ConsumedTime");

                    b.HasIndex("Expiration");

                    b.HasIndex("SubjectId", "ClientId", "Type");

                    b.HasIndex("SubjectId", "SessionId", "Type");

                    b.ToTable("PersistedGrants", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128)
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(128)
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("theater_laak.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Achternaam")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Adres")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Emailvoorkeur")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("FailedAttempts")
                        .HasColumnType("INTEGER");

                    b.Property<string>("GeboorteDatum")
                        .HasColumnType("TEXT");

                    b.Property<string>("Geslacht")
                        .HasColumnType("TEXT");

                    b.Property<string>("IkDoneerToken")
                        .HasColumnType("TEXT");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<string>("Telefoonnummer")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("Voornaam")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("_2faExpDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("_2faToken")
                        .HasColumnType("TEXT");

                    b.Property<bool?>("lockout")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("unlockDate")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);

                    b.HasDiscriminator<string>("Discriminator").HasValue("ApplicationUser");
                });

            modelBuilder.Entity("theater_laak.Models.ArtiestenGroep", b =>
                {
                    b.Property<int>("ArtiestenGroepId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("GroepsEmail")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("GroepsNaam")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ArtiestenGroepId");

                    b.HasIndex("GroepsEmail")
                        .IsUnique();

                    b.HasIndex("GroepsNaam")
                        .IsUnique();

                    b.ToTable("ArtiestGroepen");
                });

            modelBuilder.Entity("theater_laak.Models.Donatie", b =>
                {
                    b.Property<int>("DonatieId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Bericht")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Datum")
                        .HasColumnType("datetime");

                    b.Property<double>("TotaalBedrag")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("DonatieId");

                    b.HasIndex("UserId");

                    b.ToTable("Donaties", (string)null);
                });

            modelBuilder.Entity("theater_laak.Models.Optreden", b =>
                {
                    b.Property<int>("OptredenId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ArtiestId")
                        .HasColumnType("TEXT");

                    b.Property<int?>("ArtiestenGroepId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("BegunstigersExclusief")
                        .HasColumnType("INTEGER");

                    b.Property<bool?>("Bevestigd")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DatumTijdstip")
                        .HasColumnType("datetime");

                    b.Property<double>("Prijs")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("VoorstellingId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ZaalId")
                        .HasColumnType("INTEGER");

                    b.HasKey("OptredenId");

                    b.HasIndex("ArtiestId");

                    b.HasIndex("ArtiestenGroepId");

                    b.HasIndex("VoorstellingId");

                    b.HasIndex("ZaalId");

                    b.ToTable("Optredens", (string)null);
                });

            modelBuilder.Entity("theater_laak.Models.Stoel", b =>
                {
                    b.Property<int>("StoelId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Rang")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Rij")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ZaalId")
                        .HasColumnType("INTEGER");

                    b.HasKey("StoelId");

                    b.HasIndex("ZaalId");

                    b.ToTable("Stoelen", (string)null);
                });

            modelBuilder.Entity("theater_laak.Models.Ticket", b =>
                {
                    b.Property<int>("TicketId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("OptredenId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("QR")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("StoelId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("TicketId");

                    b.HasIndex("OptredenId");

                    b.HasIndex("StoelId");

                    b.HasIndex("UserId");

                    b.ToTable("Tickets", (string)null);
                });

            modelBuilder.Entity("theater_laak.Models.Voorstelling", b =>
                {
                    b.Property<int>("VoorstellingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Afbeelding")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Beschrijving")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("TijdsduurInMinuten")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Titel")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("VoorstellingId");

                    b.HasIndex("Titel")
                        .IsUnique();

                    b.ToTable("Voorstellingen", (string)null);
                });

            modelBuilder.Entity("theater_laak.Models.Zaal", b =>
                {
                    b.Property<int>("ZaalId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AantalStoelen")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Grootte")
                        .HasColumnType("TEXT");

                    b.HasKey("ZaalId");

                    b.ToTable("Zalen", (string)null);
                });

            modelBuilder.Entity("theater_laak.Models.Artiest", b =>
                {
                    b.HasBaseType("theater_laak.Models.ApplicationUser");

                    b.Property<int?>("ArtiestenGroepId")
                        .HasColumnType("INTEGER");

                    b.HasIndex("ArtiestenGroepId");

                    b.HasDiscriminator().HasValue("Artiest");
                });

            modelBuilder.Entity("theater_laak.Models.Klant", b =>
                {
                    b.HasBaseType("theater_laak.Models.ApplicationUser");

                    b.HasDiscriminator().HasValue("Klant");
                });

            modelBuilder.Entity("theater_laak.Models.Medewerker", b =>
                {
                    b.HasBaseType("theater_laak.Models.ApplicationUser");

                    b.Property<string>("BankGegevens")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DienstDatum")
                        .HasColumnType("TEXT");

                    b.Property<string>("IP")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("Loon")
                        .HasColumnType("REAL");

                    b.HasDiscriminator().HasValue("Medewerker");
                });

            modelBuilder.Entity("theater_laak.Models.Admin", b =>
                {
                    b.HasBaseType("theater_laak.Models.Medewerker");

                    b.HasDiscriminator().HasValue("Admin");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("theater_laak.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("theater_laak.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("theater_laak.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("theater_laak.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("theater_laak.Models.Donatie", b =>
                {
                    b.HasOne("theater_laak.Models.ApplicationUser", "ApplicationUser")
                        .WithMany("Donaties")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_Donatie_ApplicationUser_2");

                    b.Navigation("ApplicationUser");
                });

            modelBuilder.Entity("theater_laak.Models.Optreden", b =>
                {
                    b.HasOne("theater_laak.Models.Artiest", "Artiest")
                        .WithMany("Optredens")
                        .HasForeignKey("ArtiestId")
                        .HasConstraintName("FK_Optreden_Artiest_2");

                    b.HasOne("theater_laak.Models.ArtiestenGroep", "ArtiestenGroep")
                        .WithMany("Optredens")
                        .HasForeignKey("ArtiestenGroepId")
                        .HasConstraintName("FK_Optreden_Artiestengroep_2");

                    b.HasOne("theater_laak.Models.Voorstelling", "Voorstelling")
                        .WithMany("Optredens")
                        .HasForeignKey("VoorstellingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Optreden_Voorstelling_2");

                    b.HasOne("theater_laak.Models.Zaal", "Zaal")
                        .WithMany("Optredens")
                        .HasForeignKey("ZaalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Optreden_Zaal_2");

                    b.Navigation("Artiest");

                    b.Navigation("ArtiestenGroep");

                    b.Navigation("Voorstelling");

                    b.Navigation("Zaal");
                });

            modelBuilder.Entity("theater_laak.Models.Stoel", b =>
                {
                    b.HasOne("theater_laak.Models.Zaal", "Zaal")
                        .WithMany("Stoelen")
                        .HasForeignKey("ZaalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Stoel_Zaal_2");

                    b.Navigation("Zaal");
                });

            modelBuilder.Entity("theater_laak.Models.Ticket", b =>
                {
                    b.HasOne("theater_laak.Models.Optreden", "Optreden")
                        .WithMany("Tickets")
                        .HasForeignKey("OptredenId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Ticket_Optreden_2");

                    b.HasOne("theater_laak.Models.Stoel", "Stoel")
                        .WithMany("Tickets")
                        .HasForeignKey("StoelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Ticket_Stoel_2");

                    b.HasOne("theater_laak.Models.ApplicationUser", "ApplicationUser")
                        .WithMany("Tickets")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_Ticket_ApplicationUser_2");

                    b.Navigation("ApplicationUser");

                    b.Navigation("Optreden");

                    b.Navigation("Stoel");
                });

            modelBuilder.Entity("theater_laak.Models.Artiest", b =>
                {
                    b.HasOne("theater_laak.Models.ArtiestenGroep", "ArtiestenGroep")
                        .WithMany("Artiesten")
                        .HasForeignKey("ArtiestenGroepId")
                        .HasConstraintName("FK_Artiest_ArtiestenGroep_2");

                    b.Navigation("ArtiestenGroep");
                });

            modelBuilder.Entity("theater_laak.Models.ApplicationUser", b =>
                {
                    b.Navigation("Donaties");

                    b.Navigation("Tickets");
                });

            modelBuilder.Entity("theater_laak.Models.ArtiestenGroep", b =>
                {
                    b.Navigation("Artiesten");

                    b.Navigation("Optredens");
                });

            modelBuilder.Entity("theater_laak.Models.Optreden", b =>
                {
                    b.Navigation("Tickets");
                });

            modelBuilder.Entity("theater_laak.Models.Stoel", b =>
                {
                    b.Navigation("Tickets");
                });

            modelBuilder.Entity("theater_laak.Models.Voorstelling", b =>
                {
                    b.Navigation("Optredens");
                });

            modelBuilder.Entity("theater_laak.Models.Zaal", b =>
                {
                    b.Navigation("Optredens");

                    b.Navigation("Stoelen");
                });

            modelBuilder.Entity("theater_laak.Models.Artiest", b =>
                {
                    b.Navigation("Optredens");
                });
#pragma warning restore 612, 618
        }
    }
}
