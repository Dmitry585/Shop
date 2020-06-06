using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EntityDatabase.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductTypes",
                columns: table => new
                {
                    ProductTypeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductTypes", x => x.ProductTypeId);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    RoleId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.RoleId);
                });

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
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<float>(nullable: false),
                    Count = table.Column<int>(nullable: false),
                    Image = table.Column<string>(nullable: true),
                    About = table.Column<string>(nullable: true),
                    ProductTypeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_Products_ProductTypes_ProductTypeId",
                        column: x => x.ProductTypeId,
                        principalTable: "ProductTypes",
                        principalColumn: "ProductTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    PersonId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Login = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    RoleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.PersonId);
                    table.ForeignKey(
                        name: "FK_Persons_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rezervations",
                columns: table => new
                {
                    RezervationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PersonsCount = table.Column<int>(nullable: false),
                    RezervationDate = table.Column<DateTime>(nullable: false),
                    TableId = table.Column<int>(nullable: false),
                    Items = table.Column<string>(nullable: true)
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

            migrationBuilder.InsertData(
                table: "ProductTypes",
                columns: new[] { "ProductTypeId", "Name" },
                values: new object[,]
                {
                    { 1, "Виноградные" },
                    { 2, "Ягодные" },
                    { 3, "Многосортные" },
                    { 4, "Сухое" },
                    { 5, "Сладкое" },
                    { 6, "Белое" },
                    { 7, "Красное" }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "RoleId", "Name" },
                values: new object[,]
                {
                    { 1, "Администратор" },
                    { 2, "Пользователь" }
                });

            migrationBuilder.InsertData(
                table: "Tables",
                columns: new[] { "TableId", "MaxPerson" },
                values: new object[,]
                {
                    { 1, 5 },
                    { 2, 4 }
                });

            migrationBuilder.InsertData(
                table: "Persons",
                columns: new[] { "PersonId", "Login", "Password", "RoleId" },
                values: new object[] { 1, "admin", "AQAAAAEAACcQAAAAEPV1YJvT3lY/9S2pUwRMxv1IHwUrwbWcjQ+IfaWAKD2diUOPFV9uOnEuo15gKBX+Qw==", 1 });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "About", "Count", "Image", "Name", "Price", "ProductTypeId" },
                values: new object[,]
                {
                    { 1, "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока...", 5, "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg", "Виноградное вино", 10f, 1 },
                    { 2, "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока...", 5, "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg", "Ягодное вино", 10f, 2 },
                    { 3, "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока...", 10, "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg", "Многосортное вино", 20f, 3 },
                    { 4, "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока...", 0, "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg", "Виноградное сухое вино", 15f, 4 },
                    { 5, "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока...", 3, "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg", "Виноградное сладкое вино", 12f, 5 },
                    { 6, "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока...", 5, "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg", "Ягодное белое вино", 11f, 6 },
                    { 7, "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока...", 5, "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg", "Ягодное красное вино", 10f, 7 }
                });

            migrationBuilder.InsertData(
                table: "Rezervations",
                columns: new[] { "RezervationId", "Items", "PersonsCount", "RezervationDate", "TableId" },
                values: new object[] { 1, @"<?xml version=""1.0"" encoding=""utf-16""?>
<ArrayOfOrd xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"">
  <Ord>
    <Id>1</Id>
    <ProductId>1</ProductId>
    <Count>1</Count>
  </Ord>
  <Ord>
    <Id>2</Id>
    <ProductId>2</ProductId>
    <Count>2</Count>
  </Ord>
  <Ord>
    <Id>3</Id>
    <ProductId>3</ProductId>
    <Count>3</Count>
  </Ord>
</ArrayOfOrd>", 2, new DateTime(2020, 5, 25, 12, 30, 0, 0, DateTimeKind.Unspecified), 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Persons_Login",
                table: "Persons",
                column: "Login",
                unique: true,
                filter: "[Login] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Persons_RoleId",
                table: "Persons",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductTypeId",
                table: "Products",
                column: "ProductTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Rezervations_TableId",
                table: "Rezervations",
                column: "TableId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Persons");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Rezervations");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "ProductTypes");

            migrationBuilder.DropTable(
                name: "Tables");
        }
    }
}
