using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EntityDatabase.Migrations
{
    public partial class CreateRezervationAndTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tables",
                columns: table => new
                {
                    TableId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaxPerson = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tables", x => x.TableId);
                });

            migrationBuilder.CreateTable(
                name: "Rezervations",
                columns: table => new
                {
                    RezervationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PersonsCount = table.Column<int>(nullable: false),
                    RezervationDate = table.Column<DateTime>(nullable: false),
                    TableId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rezervations", x => x.RezervationId);
                    table.ForeignKey(
                        name: "FK_Rezervations_Tables_TableId",
                        column: x => x.TableId,
                        principalTable: "Tables",
                        principalColumn: "TableId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Persons",
                keyColumn: "PersonId",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEINKofMyIv1fxtwB8kZfQzymqQ8HaZJP4x7tM7LwP/YpOkQOW9yUvCcjux9roIkeew==");

            migrationBuilder.InsertData(
                table: "Tables",
                columns: new[] { "TableId", "MaxPerson" },
                values: new object[] { 2, 4 });

            migrationBuilder.InsertData(
                table: "Tables",
                columns: new[] { "TableId", "MaxPerson" },
                values: new object[] { 1, 5 });

            migrationBuilder.InsertData(
                table: "Rezervations",
                columns: new[] { "RezervationId", "PersonsCount", "RezervationDate", "TableId" },
                values: new object[,]
                {
                    { 1, 2, new DateTime(2020, 5, 25, 12, 30, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 2, 4, new DateTime(2020, 5, 25, 14, 30, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 3, 2, new DateTime(2020, 5, 25, 12, 30, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 4, 4, new DateTime(2020, 5, 25, 14, 30, 0, 0, DateTimeKind.Unspecified), 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rezervations_TableId",
                table: "Rezervations",
                column: "TableId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rezervations");

            migrationBuilder.DropTable(
                name: "Tables");

            migrationBuilder.UpdateData(
                table: "Persons",
                keyColumn: "PersonId",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEGxRGnlFlCOcxB1oG0b4EQEmDnd5GOqtxxRV/UtS8CTjPl70fMTf61JYE7JFk8SlMQ==");
        }
    }
}
