using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class artiestenportaal27 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Optredens_ArtiestGroepen_ArtiestenGroepId",
                table: "Optredens");

            migrationBuilder.DropForeignKey(
                name: "FK_Optredens_AspNetUsers_ArtiestId",
                table: "Optredens");

            migrationBuilder.AlterColumn<bool>(
                name: "Bevestigd",
                table: "Optredens",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Optreden_Artiest_2",
                table: "Optredens",
                column: "ArtiestId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Optreden_Artiestengroep_2",
                table: "Optredens",
                column: "ArtiestenGroepId",
                principalTable: "ArtiestGroepen",
                principalColumn: "ArtiestenGroepId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Optreden_Artiest_2",
                table: "Optredens");

            migrationBuilder.DropForeignKey(
                name: "FK_Optreden_Artiestengroep_2",
                table: "Optredens");

            migrationBuilder.AlterColumn<bool>(
                name: "Bevestigd",
                table: "Optredens",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Optredens_ArtiestGroepen_ArtiestenGroepId",
                table: "Optredens",
                column: "ArtiestenGroepId",
                principalTable: "ArtiestGroepen",
                principalColumn: "ArtiestenGroepId");

            migrationBuilder.AddForeignKey(
                name: "FK_Optredens_AspNetUsers_ArtiestId",
                table: "Optredens",
                column: "ArtiestId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
