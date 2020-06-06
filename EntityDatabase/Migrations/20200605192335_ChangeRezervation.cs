using Microsoft.EntityFrameworkCore.Migrations;

namespace EntityDatabase.Migrations
{
    public partial class ChangeRezervation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rezervations_Tables_TableId",
                table: "Rezervations");

            migrationBuilder.DropColumn(
                name: "PersonsCount",
                table: "Rezervations");

            migrationBuilder.AlterColumn<int>(
                name: "TableId",
                table: "Rezervations",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "PersonName",
                table: "Rezervations",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Persons",
                keyColumn: "PersonId",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAELdMjgxY833cPnfqnNskF5qv2buzS7jFr0qU6KfmIci0vP6TYPW1NQmW9zxjzHnBRw==");

            migrationBuilder.UpdateData(
                table: "Rezervations",
                keyColumn: "RezervationId",
                keyValue: 1,
                column: "PersonName",
                value: "Тест");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervations_Tables_TableId",
                table: "Rezervations",
                column: "TableId",
                principalTable: "Tables",
                principalColumn: "TableId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rezervations_Tables_TableId",
                table: "Rezervations");

            migrationBuilder.DropColumn(
                name: "PersonName",
                table: "Rezervations");

            migrationBuilder.AlterColumn<int>(
                name: "TableId",
                table: "Rezervations",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PersonsCount",
                table: "Rezervations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Persons",
                keyColumn: "PersonId",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEPV1YJvT3lY/9S2pUwRMxv1IHwUrwbWcjQ+IfaWAKD2diUOPFV9uOnEuo15gKBX+Qw==");

            migrationBuilder.UpdateData(
                table: "Rezervations",
                keyColumn: "RezervationId",
                keyValue: 1,
                column: "PersonsCount",
                value: 2);

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervations_Tables_TableId",
                table: "Rezervations",
                column: "TableId",
                principalTable: "Tables",
                principalColumn: "TableId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
