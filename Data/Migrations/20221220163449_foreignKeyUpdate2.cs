using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class foreignKeyUpdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artiest_ArtiestGroep_ArtiestenGroepId",
                table: "Artiest");

            migrationBuilder.AlterColumn<int>(
                name: "ArtiestenGroepId",
                table: "Artiest",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.CreateIndex(
                name: "IX_Optreden_VoorstellingId",
                table: "Optreden",
                column: "VoorstellingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Artiest_ArtiestGroep_ArtiestenGroepId",
                table: "Artiest",
                column: "ArtiestenGroepId",
                principalTable: "ArtiestGroep",
                principalColumn: "ArtiestenGroepId");

            migrationBuilder.AddForeignKey(
                name: "FK_Optreden_Voorstelling_VoorstellingId",
                table: "Optreden",
                column: "VoorstellingId",
                principalTable: "Voorstelling",
                principalColumn: "VoorstellingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artiest_ArtiestGroep_ArtiestenGroepId",
                table: "Artiest");

            migrationBuilder.DropForeignKey(
                name: "FK_Optreden_Voorstelling_VoorstellingId",
                table: "Optreden");

            migrationBuilder.DropIndex(
                name: "IX_Optreden_VoorstellingId",
                table: "Optreden");

            migrationBuilder.AlterColumn<int>(
                name: "ArtiestenGroepId",
                table: "Artiest",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Artiest_ArtiestGroep_ArtiestenGroepId",
                table: "Artiest",
                column: "ArtiestenGroepId",
                principalTable: "ArtiestGroep",
                principalColumn: "ArtiestenGroepId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
