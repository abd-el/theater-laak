using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class stoel7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Stoel_2",
                table: "Tickets");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Stoelen_StoelId",
                table: "Tickets",
                column: "StoelId",
                principalTable: "Stoelen",
                principalColumn: "StoelId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Stoelen_StoelId",
                table: "Tickets");

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Stoel_2",
                table: "Tickets",
                column: "StoelId",
                principalTable: "Stoelen",
                principalColumn: "StoelId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
