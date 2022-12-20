using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class foreignkeytest2 : Migration
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

            migrationBuilder.AddForeignKey(
                name: "FK_Artiest_ArtiestGroep_ArtiestenGroepId",
                table: "Artiest",
                column: "ArtiestenGroepId",
                principalTable: "ArtiestGroep",
                principalColumn: "ArtiestenGroepId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artiest_ArtiestGroep_ArtiestenGroepId",
                table: "Artiest");

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
