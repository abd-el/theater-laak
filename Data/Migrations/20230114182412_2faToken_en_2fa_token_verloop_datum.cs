using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theater_laak.Data.Migrations
{
    public partial class _2faToken_en_2fa_token_verloop_datum : Migration
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

            migrationBuilder.AddColumn<DateTime>(
                name: "_2faExpDate",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "_2faToken",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

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

            migrationBuilder.DropColumn(
                name: "_2faExpDate",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "_2faToken",
                table: "AspNetUsers");

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
