using Microsoft.EntityFrameworkCore.Migrations;

namespace EntityDatabase.Migrations
{
    public partial class AddOrdersFactory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "OrderId", "Items" },
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
</ArrayOfOrd>" });

            migrationBuilder.UpdateData(
                table: "Persons",
                keyColumn: "PersonId",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEOuia1cVflOV5HgFcjuxHQ61K0RePE55lDIbbdw6dEHWfXF7KG7m4vG47cc1J6X5/Q==");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "OrderId",
                keyValue: 1);

            migrationBuilder.UpdateData(
                table: "Persons",
                keyColumn: "PersonId",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEMm9jJfNA0btshEu1KVTtlrw4aWxZ4VY/4d1aGJ6ELmeLGfUVzAgcJuIt2hcpWi2aA==");
        }
    }
}
