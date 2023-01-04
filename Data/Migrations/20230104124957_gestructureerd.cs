using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class gestructureerd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ArtiestGroepen_ArtiestenGroepId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Donaties_AspNetUsers_UserId",
                table: "Donaties");

            migrationBuilder.DropForeignKey(
                name: "FK_Optredens_Voorstellingen_VoorstellingId",
                table: "Optredens");

            migrationBuilder.DropForeignKey(
                name: "FK_Stoel_Zalen_ZaalId",
                table: "Stoel");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_AspNetUsers_UserID",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Optredens_OptredenId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Stoel_StoelId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Voorstellingen_Zalen_ZaalId",
                table: "Voorstellingen");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Stoel",
                table: "Stoel");

            migrationBuilder.RenameTable(
                name: "Stoel",
                newName: "Stoelen");

            migrationBuilder.RenameIndex(
                name: "IX_Stoel_ZaalId",
                table: "Stoelen",
                newName: "IX_Stoelen_ZaalId");

            migrationBuilder.AlterColumn<string>(
                name: "Grootte",
                table: "Zalen",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "Afbeelding",
                table: "Voorstellingen",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<double>(
                name: "Prijs",
                table: "Optredens",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DatumTijdstip",
                table: "Optredens",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<double>(
                name: "TotaalBedrag",
                table: "Donaties",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Datum",
                table: "Donaties",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Stoelen",
                table: "Stoelen",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Artiest_ArtiestenGroep_2",
                table: "AspNetUsers",
                column: "ArtiestenGroepId",
                principalTable: "ArtiestGroepen",
                principalColumn: "ArtiestenGroepId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Donatie_ApplicationUser_2",
                table: "Donaties",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Optreden_Voorstelling_2",
                table: "Optredens",
                column: "VoorstellingId",
                principalTable: "Voorstellingen",
                principalColumn: "VoorstellingId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Stoel_Zaal_2",
                table: "Stoelen",
                column: "ZaalId",
                principalTable: "Zalen",
                principalColumn: "ZaalId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_ApplicationUser_2",
                table: "Tickets",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Optreden_2",
                table: "Tickets",
                column: "OptredenId",
                principalTable: "Optredens",
                principalColumn: "OptredenId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Stoel_2",
                table: "Tickets",
                column: "StoelId",
                principalTable: "Stoelen",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Voorstelling_Zaal_2",
                table: "Voorstellingen",
                column: "ZaalId",
                principalTable: "Zalen",
                principalColumn: "ZaalId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artiest_ArtiestenGroep_2",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Donatie_ApplicationUser_2",
                table: "Donaties");

            migrationBuilder.DropForeignKey(
                name: "FK_Optreden_Voorstelling_2",
                table: "Optredens");

            migrationBuilder.DropForeignKey(
                name: "FK_Stoel_Zaal_2",
                table: "Stoelen");

            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_ApplicationUser_2",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Optreden_2",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Stoel_2",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Voorstelling_Zaal_2",
                table: "Voorstellingen");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Stoelen",
                table: "Stoelen");

            migrationBuilder.DropColumn(
                name: "Afbeelding",
                table: "Voorstellingen");

            migrationBuilder.RenameTable(
                name: "Stoelen",
                newName: "Stoel");

            migrationBuilder.RenameIndex(
                name: "IX_Stoelen_ZaalId",
                table: "Stoel",
                newName: "IX_Stoel_ZaalId");

            migrationBuilder.AlterColumn<string>(
                name: "Grootte",
                table: "Zalen",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "Prijs",
                table: "Optredens",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DatumTijdstip",
                table: "Optredens",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AlterColumn<double>(
                name: "TotaalBedrag",
                table: "Donaties",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Datum",
                table: "Donaties",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Stoel",
                table: "Stoel",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ArtiestGroepen_ArtiestenGroepId",
                table: "AspNetUsers",
                column: "ArtiestenGroepId",
                principalTable: "ArtiestGroepen",
                principalColumn: "ArtiestenGroepId");

            migrationBuilder.AddForeignKey(
                name: "FK_Donaties_AspNetUsers_UserId",
                table: "Donaties",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Optredens_Voorstellingen_VoorstellingId",
                table: "Optredens",
                column: "VoorstellingId",
                principalTable: "Voorstellingen",
                principalColumn: "VoorstellingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stoel_Zalen_ZaalId",
                table: "Stoel",
                column: "ZaalId",
                principalTable: "Zalen",
                principalColumn: "ZaalId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_AspNetUsers_UserID",
                table: "Tickets",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Optredens_OptredenId",
                table: "Tickets",
                column: "OptredenId",
                principalTable: "Optredens",
                principalColumn: "OptredenId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Stoel_StoelId",
                table: "Tickets",
                column: "StoelId",
                principalTable: "Stoel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Voorstellingen_Zalen_ZaalId",
                table: "Voorstellingen",
                column: "ZaalId",
                principalTable: "Zalen",
                principalColumn: "ZaalId");
        }
    }
}
