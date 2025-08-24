using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class q34 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Realizations_Purchases_PurchaseId",
                table: "Realizations");

            migrationBuilder.AlterColumn<int>(
                name: "PurchaseId",
                table: "Realizations",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Realizations_Purchases_PurchaseId",
                table: "Realizations",
                column: "PurchaseId",
                principalTable: "Purchases",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Realizations_Purchases_PurchaseId",
                table: "Realizations");

            migrationBuilder.AlterColumn<int>(
                name: "PurchaseId",
                table: "Realizations",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Realizations_Purchases_PurchaseId",
                table: "Realizations",
                column: "PurchaseId",
                principalTable: "Purchases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
