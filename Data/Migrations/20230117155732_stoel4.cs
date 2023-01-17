using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class stoel4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Stoel_2",
                table: "Tickets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Stoelen",
                table: "Stoelen");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Stoelen");

            migrationBuilder.AlterColumn<int>(
                name: "StoelId",
                table: "Tickets",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<int>(
                name: "StoelId",
                table: "Stoelen",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0)
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Stoelen",
                table: "Stoelen",
                column: "StoelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Stoel_2",
                table: "Tickets",
                column: "StoelId",
                principalTable: "Stoelen",
                principalColumn: "StoelId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Stoel_2",
                table: "Tickets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Stoelen",
                table: "Stoelen");

            migrationBuilder.DropColumn(
                name: "StoelId",
                table: "Stoelen");

            migrationBuilder.AlterColumn<string>(
                name: "StoelId",
                table: "Tickets",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "Stoelen",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Stoelen",
                table: "Stoelen",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Stoel_2",
                table: "Tickets",
                column: "StoelId",
                principalTable: "Stoelen",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
