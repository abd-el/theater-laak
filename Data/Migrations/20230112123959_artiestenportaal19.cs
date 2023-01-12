using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class artiestenportaal19 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artiest_ArtiestenGroep_2",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Donatie_ApplicationUser_2",
                table: "Donaties");

            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_ApplicationUser_2",
                table: "Tickets");

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
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_ApplicationUser_2",
                table: "Tickets",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
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
                name: "FK_Ticket_ApplicationUser_2",
                table: "Tickets");

            migrationBuilder.AddForeignKey(
                name: "FK_Artiest_ArtiestenGroep_2",
                table: "AspNetUsers",
                column: "ArtiestenGroepId",
                principalTable: "ArtiestGroepen",
                principalColumn: "ArtiestenGroepId");

            migrationBuilder.AddForeignKey(
                name: "FK_Donatie_ApplicationUser_2",
                table: "Donaties",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_ApplicationUser_2",
                table: "Tickets",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
