using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class stoeldb_4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DerdeRangAantalStoelen",
                table: "Zalen");

            migrationBuilder.DropColumn(
                name: "EersteRangAantalStoelen",
                table: "Zalen");

            migrationBuilder.DropColumn(
                name: "TweedeRangAantalStoelen",
                table: "Zalen");

            migrationBuilder.AddColumn<string>(
                name: "StoelId",
                table: "Tickets",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Stoel",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    ZaalId = table.Column<int>(type: "INTEGER", nullable: false),
                    Rang = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stoel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stoel_Zalen_ZaalId",
                        column: x => x.ZaalId,
                        principalTable: "Zalen",
                        principalColumn: "ZaalId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_StoelId",
                table: "Tickets",
                column: "StoelId");

            migrationBuilder.CreateIndex(
                name: "IX_Stoel_ZaalId",
                table: "Stoel",
                column: "ZaalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Stoel_StoelId",
                table: "Tickets",
                column: "StoelId",
                principalTable: "Stoel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Stoel_StoelId",
                table: "Tickets");

            migrationBuilder.DropTable(
                name: "Stoel");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_StoelId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "StoelId",
                table: "Tickets");

            migrationBuilder.AddColumn<int>(
                name: "DerdeRangAantalStoelen",
                table: "Zalen",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EersteRangAantalStoelen",
                table: "Zalen",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TweedeRangAantalStoelen",
                table: "Zalen",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
