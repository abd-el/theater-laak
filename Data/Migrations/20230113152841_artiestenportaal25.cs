using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class artiestenportaal25 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Optredens_AspNetUsers_ArtiestId1",
                table: "Optredens");

            migrationBuilder.DropIndex(
                name: "IX_Optredens_ArtiestId1",
                table: "Optredens");

            migrationBuilder.DropColumn(
                name: "ArtiestId1",
                table: "Optredens");

            migrationBuilder.AlterColumn<string>(
                name: "ArtiestId",
                table: "Optredens",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Optredens_ArtiestId",
                table: "Optredens",
                column: "ArtiestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Optredens_AspNetUsers_ArtiestId",
                table: "Optredens",
                column: "ArtiestId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Optredens_AspNetUsers_ArtiestId",
                table: "Optredens");

            migrationBuilder.DropIndex(
                name: "IX_Optredens_ArtiestId",
                table: "Optredens");

            migrationBuilder.AlterColumn<int>(
                name: "ArtiestId",
                table: "Optredens",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ArtiestId1",
                table: "Optredens",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Optredens_ArtiestId1",
                table: "Optredens",
                column: "ArtiestId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Optredens_AspNetUsers_ArtiestId1",
                table: "Optredens",
                column: "ArtiestId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
