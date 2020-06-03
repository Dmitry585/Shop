using Microsoft.EntityFrameworkCore.Migrations;

namespace EntityDatabase.Migrations
{
    public partial class AddOrders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Items = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderId);
                });

            migrationBuilder.UpdateData(
                table: "Persons",
                keyColumn: "PersonId",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEMm9jJfNA0btshEu1KVTtlrw4aWxZ4VY/4d1aGJ6ELmeLGfUVzAgcJuIt2hcpWi2aA==");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.UpdateData(
                table: "Persons",
                keyColumn: "PersonId",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEINKofMyIv1fxtwB8kZfQzymqQ8HaZJP4x7tM7LwP/YpOkQOW9yUvCcjux9roIkeew==");
        }
    }
}
