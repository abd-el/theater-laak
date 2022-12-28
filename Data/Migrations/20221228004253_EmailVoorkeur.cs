using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class EmailVoorkeur : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nieuwsbrief",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "Emailvoorkeur",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IkDoneerToken",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Telefoonnummer",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Emailvoorkeur",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "IkDoneerToken",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Telefoonnummer",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<bool>(
                name: "Nieuwsbrief",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }
    }
}
