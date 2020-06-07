using Microsoft.EntityFrameworkCore.Migrations;

namespace EntityDatabase.Migrations
{
    public partial class CreateTriggers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Persons",
                keyColumn: "PersonId",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEMVJzQk/vY3qsl8PkxS/Q5zfb8A2WtXiUX9ngLFr4ceURxgEUui4XAFIbkpvzJvHWw==");

            migrationBuilder.CreateIndex(
                name: "IX_Rezervations_RezervationDate",
                table: "Rezervations",
                column: "RezervationDate",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Rezervations_RezervationDate",
                table: "Rezervations");

            migrationBuilder.UpdateData(
                table: "Persons",
                keyColumn: "PersonId",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAELdMjgxY833cPnfqnNskF5qv2buzS7jFr0qU6KfmIci0vP6TYPW1NQmW9zxjzHnBRw==");
        }
    }
}
