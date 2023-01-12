using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class artiestenportaal20 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ArtiestId1",
                table: "Optredens",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Voorstellingen_Titel",
                table: "Voorstellingen",
                column: "Titel",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Optredens_ArtiestenGroepId",
                table: "Optredens",
                column: "ArtiestenGroepId");

            migrationBuilder.CreateIndex(
                name: "IX_Optredens_ArtiestId1",
                table: "Optredens",
                column: "ArtiestId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Optredens_ArtiestGroepen_ArtiestenGroepId",
                table: "Optredens",
                column: "ArtiestenGroepId",
                principalTable: "ArtiestGroepen",
                principalColumn: "ArtiestenGroepId");

            migrationBuilder.AddForeignKey(
                name: "FK_Optredens_AspNetUsers_ArtiestId1",
                table: "Optredens",
                column: "ArtiestId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Optredens_ArtiestGroepen_ArtiestenGroepId",
                table: "Optredens");

            migrationBuilder.DropForeignKey(
                name: "FK_Optredens_AspNetUsers_ArtiestId1",
                table: "Optredens");

            migrationBuilder.DropIndex(
                name: "IX_Voorstellingen_Titel",
                table: "Voorstellingen");

            migrationBuilder.DropIndex(
                name: "IX_Optredens_ArtiestenGroepId",
                table: "Optredens");

            migrationBuilder.DropIndex(
                name: "IX_Optredens_ArtiestId1",
                table: "Optredens");

            migrationBuilder.DropColumn(
                name: "ArtiestId1",
                table: "Optredens");
        }
    }
}
