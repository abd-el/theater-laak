using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class medewerkerupdate_3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Optreden_Voorstelling_VoorstellingId",
                table: "Optreden");

            migrationBuilder.DropTable(
                name: "Artiest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Zaal",
                table: "Zaal");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Voorstelling",
                table: "Voorstelling");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Optreden",
                table: "Optreden");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ArtiestGroep",
                table: "ArtiestGroep");

            migrationBuilder.DropColumn(
                name: "Klein",
                table: "Zaal");

            migrationBuilder.RenameTable(
                name: "Zaal",
                newName: "Zalen");

            migrationBuilder.RenameTable(
                name: "Voorstelling",
                newName: "Voorstellingen");

            migrationBuilder.RenameTable(
                name: "Optreden",
                newName: "Optredens");

            migrationBuilder.RenameTable(
                name: "ArtiestGroep",
                newName: "ArtiestGroepen");

            migrationBuilder.RenameIndex(
                name: "IX_Optreden_VoorstellingId",
                table: "Optredens",
                newName: "IX_Optredens_VoorstellingId");

            migrationBuilder.RenameColumn(
                name: "Naam",
                table: "ArtiestGroepen",
                newName: "GroepsNaam");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "ArtiestGroepen",
                newName: "GroepsEmail");

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "AspNetUsers",
                type: "TEXT",
                maxLength: 256,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Achternaam",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Adres",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ArtiestId",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ArtiestenGroepId",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BankGegevens",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DienstDatum",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateOnly>(
                name: "GeboorteDatum",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Geslacht",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IP",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Loon",
                table: "AspNetUsers",
                type: "REAL",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Nieuwsbrief",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Voornaam",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TweedeRangAantalStoelen",
                table: "Zalen",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DerdeRangAantalStoelen",
                table: "Zalen",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Grootte",
                table: "Zalen",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ZaalId",
                table: "Voorstellingen",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "BegunstigersExclusief",
                table: "Optredens",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Zalen",
                table: "Zalen",
                column: "ZaalId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Voorstellingen",
                table: "Voorstellingen",
                column: "VoorstellingId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Optredens",
                table: "Optredens",
                column: "OptredenId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ArtiestGroepen",
                table: "ArtiestGroepen",
                column: "ArtiestenGroepId");

            migrationBuilder.CreateTable(
                name: "Donaties",
                columns: table => new
                {
                    DonatieId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Datum = table.Column<DateTime>(type: "TEXT", nullable: false),
                    TotaalBedrag = table.Column<double>(type: "REAL", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: true),
                    Bericht = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Donaties", x => x.DonatieId);
                    table.ForeignKey(
                        name: "FK_Donaties_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    TicketID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    QR = table.Column<string>(type: "TEXT", nullable: false),
                    UserID = table.Column<string>(type: "TEXT", nullable: true),
                    OptredenId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.TicketID);
                    table.ForeignKey(
                        name: "FK_Tickets_AspNetUsers_UserID",
                        column: x => x.UserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tickets_Optredens_OptredenId",
                        column: x => x.OptredenId,
                        principalTable: "Optredens",
                        principalColumn: "OptredenId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ArtiestenGroepId",
                table: "AspNetUsers",
                column: "ArtiestenGroepId");

            migrationBuilder.CreateIndex(
                name: "IX_Voorstellingen_ZaalId",
                table: "Voorstellingen",
                column: "ZaalId");

            migrationBuilder.CreateIndex(
                name: "IX_Donaties_UserId",
                table: "Donaties",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_OptredenId",
                table: "Tickets",
                column: "OptredenId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_UserID",
                table: "Tickets",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ArtiestGroepen_ArtiestenGroepId",
                table: "AspNetUsers",
                column: "ArtiestenGroepId",
                principalTable: "ArtiestGroepen",
                principalColumn: "ArtiestenGroepId");

            migrationBuilder.AddForeignKey(
                name: "FK_Optredens_Voorstellingen_VoorstellingId",
                table: "Optredens",
                column: "VoorstellingId",
                principalTable: "Voorstellingen",
                principalColumn: "VoorstellingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Voorstellingen_Zalen_ZaalId",
                table: "Voorstellingen",
                column: "ZaalId",
                principalTable: "Zalen",
                principalColumn: "ZaalId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ArtiestGroepen_ArtiestenGroepId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Optredens_Voorstellingen_VoorstellingId",
                table: "Optredens");

            migrationBuilder.DropForeignKey(
                name: "FK_Voorstellingen_Zalen_ZaalId",
                table: "Voorstellingen");

            migrationBuilder.DropTable(
                name: "Donaties");

            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ArtiestenGroepId",
                table: "AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Zalen",
                table: "Zalen");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Voorstellingen",
                table: "Voorstellingen");

            migrationBuilder.DropIndex(
                name: "IX_Voorstellingen_ZaalId",
                table: "Voorstellingen");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Optredens",
                table: "Optredens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ArtiestGroepen",
                table: "ArtiestGroepen");

            migrationBuilder.DropColumn(
                name: "Achternaam",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Adres",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ArtiestId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ArtiestenGroepId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "BankGegevens",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DienstDatum",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "GeboorteDatum",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Geslacht",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "IP",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Loon",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Nieuwsbrief",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Voornaam",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Grootte",
                table: "Zalen");

            migrationBuilder.DropColumn(
                name: "ZaalId",
                table: "Voorstellingen");

            migrationBuilder.DropColumn(
                name: "BegunstigersExclusief",
                table: "Optredens");

            migrationBuilder.RenameTable(
                name: "Zalen",
                newName: "Zaal");

            migrationBuilder.RenameTable(
                name: "Voorstellingen",
                newName: "Voorstelling");

            migrationBuilder.RenameTable(
                name: "Optredens",
                newName: "Optreden");

            migrationBuilder.RenameTable(
                name: "ArtiestGroepen",
                newName: "ArtiestGroep");

            migrationBuilder.RenameIndex(
                name: "IX_Optredens_VoorstellingId",
                table: "Optreden",
                newName: "IX_Optreden_VoorstellingId");

            migrationBuilder.RenameColumn(
                name: "GroepsNaam",
                table: "ArtiestGroep",
                newName: "Naam");

            migrationBuilder.RenameColumn(
                name: "GroepsEmail",
                table: "ArtiestGroep",
                newName: "Email");

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "AspNetUsers",
                type: "TEXT",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 256);

            migrationBuilder.AlterColumn<int>(
                name: "TweedeRangAantalStoelen",
                table: "Zaal",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "DerdeRangAantalStoelen",
                table: "Zaal",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<bool>(
                name: "Klein",
                table: "Zaal",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Zaal",
                table: "Zaal",
                column: "ZaalId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Voorstelling",
                table: "Voorstelling",
                column: "VoorstellingId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Optreden",
                table: "Optreden",
                column: "OptredenId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ArtiestGroep",
                table: "ArtiestGroep",
                column: "ArtiestenGroepId");

            migrationBuilder.CreateTable(
                name: "Artiest",
                columns: table => new
                {
                    ArtiestId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ArtiestenGroepId = table.Column<int>(type: "INTEGER", nullable: true),
                    Achternaam = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    GeboorteDatum = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    Geslacht = table.Column<string>(type: "TEXT", nullable: true),
                    Telefoonnummer = table.Column<string>(type: "TEXT", nullable: false),
                    Voornaam = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Artiest", x => x.ArtiestId);
                    table.ForeignKey(
                        name: "FK_Artiest_ArtiestGroep_ArtiestenGroepId",
                        column: x => x.ArtiestenGroepId,
                        principalTable: "ArtiestGroep",
                        principalColumn: "ArtiestenGroepId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Artiest_ArtiestenGroepId",
                table: "Artiest",
                column: "ArtiestenGroepId");

            migrationBuilder.AddForeignKey(
                name: "FK_Optreden_Voorstelling_VoorstellingId",
                table: "Optreden",
                column: "VoorstellingId",
                principalTable: "Voorstelling",
                principalColumn: "VoorstellingId");
        }
    }
}
