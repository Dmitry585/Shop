﻿// <auto-generated />
using EntityDatabase.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EntityDatabase.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20200525103237_ChangeData")]
    partial class ChangeData
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Model.Models.Person", b =>
                {
                    b.Property<int>("PersonId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Login")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("PersonId");

                    b.HasIndex("Login")
                        .IsUnique()
                        .HasFilter("[Login] IS NOT NULL");

                    b.HasIndex("RoleId");

                    b.ToTable("Persons");

                    b.HasData(
                        new
                        {
                            PersonId = 1,
                            Login = "admin",
                            Password = "AQAAAAEAACcQAAAAEGxRGnlFlCOcxB1oG0b4EQEmDnd5GOqtxxRV/UtS8CTjPl70fMTf61JYE7JFk8SlMQ==",
                            RoleId = 1
                        });
                });

            modelBuilder.Entity("Model.Models.Product", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("About")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Count")
                        .HasColumnType("int");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.Property<int>("ProductTypeId")
                        .HasColumnType("int");

                    b.HasKey("ProductId");

                    b.HasIndex("ProductTypeId");

                    b.ToTable("Products");

                    b.HasData(
                        new
                        {
                            ProductId = 1,
                            About = "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока...",
                            Count = 5,
                            Image = "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg",
                            Name = "Виноградное вино",
                            Price = 10f,
                            ProductTypeId = 1
                        },
                        new
                        {
                            ProductId = 2,
                            About = "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока...",
                            Count = 5,
                            Image = "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg",
                            Name = "Ягодное вино",
                            Price = 10f,
                            ProductTypeId = 2
                        },
                        new
                        {
                            ProductId = 3,
                            About = "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока...",
                            Count = 10,
                            Image = "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg",
                            Name = "Многосортное вино",
                            Price = 20f,
                            ProductTypeId = 3
                        },
                        new
                        {
                            ProductId = 4,
                            About = "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока...",
                            Count = 0,
                            Image = "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg",
                            Name = "Виноградное сухое вино",
                            Price = 15f,
                            ProductTypeId = 4
                        },
                        new
                        {
                            ProductId = 5,
                            About = "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока...",
                            Count = 3,
                            Image = "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg",
                            Name = "Виноградное сладкое вино",
                            Price = 12f,
                            ProductTypeId = 5
                        },
                        new
                        {
                            ProductId = 6,
                            About = "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока...",
                            Count = 5,
                            Image = "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg",
                            Name = "Ягодное белое вино",
                            Price = 11f,
                            ProductTypeId = 6
                        },
                        new
                        {
                            ProductId = 7,
                            About = "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока...",
                            Count = 5,
                            Image = "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg",
                            Name = "Ягодное красное вино",
                            Price = 10f,
                            ProductTypeId = 7
                        });
                });

            modelBuilder.Entity("Model.Models.ProductType", b =>
                {
                    b.Property<int>("ProductTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ProductTypeId");

                    b.ToTable("ProductTypes");

                    b.HasData(
                        new
                        {
                            ProductTypeId = 1,
                            Name = "Виноградные"
                        },
                        new
                        {
                            ProductTypeId = 2,
                            Name = "Ягодные"
                        },
                        new
                        {
                            ProductTypeId = 3,
                            Name = "Многосортные"
                        },
                        new
                        {
                            ProductTypeId = 4,
                            Name = "Сухое"
                        },
                        new
                        {
                            ProductTypeId = 5,
                            Name = "Сладкое"
                        },
                        new
                        {
                            ProductTypeId = 6,
                            Name = "Белое"
                        },
                        new
                        {
                            ProductTypeId = 7,
                            Name = "Красное"
                        });
                });

            modelBuilder.Entity("Model.Models.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RoleId");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            RoleId = 1,
                            Name = "Администратор"
                        },
                        new
                        {
                            RoleId = 2,
                            Name = "Пользователь"
                        });
                });

            modelBuilder.Entity("Model.Models.Person", b =>
                {
                    b.HasOne("Model.Models.Role", "Role")
                        .WithMany("Persons")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Model.Models.Product", b =>
                {
                    b.HasOne("Model.Models.ProductType", "Type")
                        .WithMany()
                        .HasForeignKey("ProductTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
