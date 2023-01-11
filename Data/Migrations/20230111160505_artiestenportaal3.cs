using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class artiestenportaal3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ArtiestGroepen_GroepsEmail",
                table: "ArtiestGroepen",
                column: "GroepsEmail",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ArtiestGroepen_GroepsNaam",
                table: "ArtiestGroepen",
                column: "GroepsNaam",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ArtiestGroepen_GroepsEmail",
                table: "ArtiestGroepen");

            migrationBuilder.DropIndex(
                name: "IX_ArtiestGroepen_GroepsNaam",
                table: "ArtiestGroepen");
        }
    }
}
