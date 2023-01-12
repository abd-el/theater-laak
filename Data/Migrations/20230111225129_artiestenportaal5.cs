using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class artiestenportaal5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Voorstelling_Zaal_2",
                table: "Voorstellingen");

            migrationBuilder.DropIndex(
                name: "IX_Voorstellingen_ZaalId",
                table: "Voorstellingen");

            migrationBuilder.DropColumn(
                name: "ZaalId",
                table: "Voorstellingen");

            migrationBuilder.AddColumn<int>(
                name: "ZaalId",
                table: "Optredens",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Optredens_ZaalId",
                table: "Optredens",
                column: "ZaalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Optreden_Zaal_2",
                table: "Optredens",
                column: "ZaalId",
                principalTable: "Zalen",
                principalColumn: "ZaalId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Optreden_Zaal_2",
                table: "Optredens");

            migrationBuilder.DropIndex(
                name: "IX_Optredens_ZaalId",
                table: "Optredens");

            migrationBuilder.DropColumn(
                name: "ZaalId",
                table: "Optredens");

            migrationBuilder.AddColumn<int>(
                name: "ZaalId",
                table: "Voorstellingen",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Voorstellingen_ZaalId",
                table: "Voorstellingen",
                column: "ZaalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Voorstelling_Zaal_2",
                table: "Voorstellingen",
                column: "ZaalId",
                principalTable: "Zalen",
                principalColumn: "ZaalId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
