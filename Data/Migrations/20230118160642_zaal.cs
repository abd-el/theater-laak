using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class zaal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AantalStoelen",
                table: "Zalen");

            migrationBuilder.DropColumn(
                name: "Grootte",
                table: "Zalen");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
