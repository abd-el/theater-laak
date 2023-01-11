using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class artiestenportaal1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artiest_ArtiestenGroep_2",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<bool>(
                name: "Bevestigd",
                table: "Optredens",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Artiest_ArtiestenGroep_2",
                table: "AspNetUsers",
                column: "ArtiestenGroepId",
                principalTable: "ArtiestGroepen",
                principalColumn: "ArtiestenGroepId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artiest_ArtiestenGroep_2",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Bevestigd",
                table: "Optredens");

            migrationBuilder.AddForeignKey(
                name: "FK_Artiest_ArtiestenGroep_2",
                table: "AspNetUsers",
                column: "ArtiestenGroepId",
                principalTable: "ArtiestGroepen",
                principalColumn: "ArtiestenGroepId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
