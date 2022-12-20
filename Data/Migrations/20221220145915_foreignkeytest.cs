using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class foreignkeytest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ArtiestGroep",
                columns: table => new
                {
                    ArtiestenGroepId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Naam = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtiestGroep", x => x.ArtiestenGroepId);
                });

            migrationBuilder.CreateTable(
                name: "Optreden",
                columns: table => new
                {
                    OptredenId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Prijs = table.Column<double>(type: "REAL", nullable: false),
                    DatumTijdstip = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ArtiestenGroepId = table.Column<int>(type: "INTEGER", nullable: true),
                    ArtiestId = table.Column<int>(type: "INTEGER", nullable: true),
                    VoorstellingId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Optreden", x => x.OptredenId);
                });

            migrationBuilder.CreateTable(
                name: "Voorstelling",
                columns: table => new
                {
                    VoorstellingId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Titel = table.Column<string>(type: "TEXT", nullable: false),
                    Beschrijving = table.Column<string>(type: "TEXT", nullable: false),
                    TijdsduurInMinuten = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voorstelling", x => x.VoorstellingId);
                });

            migrationBuilder.CreateTable(
                name: "Zaal",
                columns: table => new
                {
                    ZaalId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AantalStoelen = table.Column<int>(type: "INTEGER", nullable: false),
                    EersteRangAantalStoelen = table.Column<int>(type: "INTEGER", nullable: false),
                    TweedeRangAantalStoelen = table.Column<int>(type: "INTEGER", nullable: true),
                    DerdeRangAantalStoelen = table.Column<int>(type: "INTEGER", nullable: true),
                    Klein = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zaal", x => x.ZaalId);
                });

            migrationBuilder.CreateTable(
                name: "Artiest",
                columns: table => new
                {
                    ArtiestId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Voornaam = table.Column<string>(type: "TEXT", nullable: true),
                    Achternaam = table.Column<string>(type: "TEXT", nullable: false),
                    GeboorteDatum = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    Telefoonnummer = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    Geslacht = table.Column<string>(type: "TEXT", nullable: true),
                    ArtiestenGroepId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Artiest", x => x.ArtiestId);
                    table.ForeignKey(
                        name: "FK_Artiest_ArtiestGroep_ArtiestenGroepId",
                        column: x => x.ArtiestenGroepId,
                        principalTable: "ArtiestGroep",
                        principalColumn: "ArtiestenGroepId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Artiest_ArtiestenGroepId",
                table: "Artiest",
                column: "ArtiestenGroepId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Artiest");

            migrationBuilder.DropTable(
                name: "Optreden");

            migrationBuilder.DropTable(
                name: "Voorstelling");

            migrationBuilder.DropTable(
                name: "Zaal");

            migrationBuilder.DropTable(
                name: "ArtiestGroep");
        }
    }
}
