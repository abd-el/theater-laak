using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class ticketverkoop : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AantalStoelen",
                table: "Zalen");

            migrationBuilder.DropColumn(
                name: "Grootte",
                table: "Zalen");

            migrationBuilder.AddColumn<DateTime>(
                name: "AangemaaktOp",
                table: "Tickets",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "Betaald",
                table: "Tickets",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AangemaaktOp",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Betaald",
                table: "Tickets");

            migrationBuilder.AddColumn<int>(
                name: "AantalStoelen",
                table: "Zalen",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Grootte",
                table: "Zalen",
                type: "TEXT",
                nullable: true);
        }
    }
}
