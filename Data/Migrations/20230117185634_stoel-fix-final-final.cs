using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class stoelfixfinalfinal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Stoel_2",
                table: "Tickets");

            migrationBuilder.DropTable(
                name: "Stoelen");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_StoelId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "StoelId",
                table: "Tickets");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StoelId",
                table: "Tickets",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Stoelen",
                columns: table => new
                {
                    StoelId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ZaalId = table.Column<int>(type: "INTEGER", nullable: false),
                    Rang = table.Column<int>(type: "INTEGER", nullable: false),
                    Rij = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stoelen", x => x.StoelId);
                    table.ForeignKey(
                        name: "FK_Stoel_Zaal_2",
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
                name: "IX_Stoelen_ZaalId",
                table: "Stoelen",
                column: "ZaalId");

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
