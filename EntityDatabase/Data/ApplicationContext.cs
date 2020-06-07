using EntityDatabase.Data.Modifications;
using EntityDatabase.Data.Repositories;
using EntityFrameworkCore.Triggers;
using Microsoft.EntityFrameworkCore;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EntityDatabase.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Person>()
                .HasIndex(p => new { p.Login })
                .IsUnique(true);

            modelBuilder.Entity<Rezervation>()
                .HasIndex(r => new { r.RezervationDate })
                .IsUnique(true);

            modelBuilder.Entity<Role>().HasData(
                new Role
                {
                    RoleId = 1,
                    Name = "Администратор"
                },
                new Role
                {
                    RoleId = 2,
                    Name = "Пользователь"
                });


            modelBuilder.Entity<Person>().HasData(
                new Person
                {
                    PersonId = 1,
                    Login = "admin",
                    Password = new Helpers.Helpers.PersonPasswordHasher().HashPassword(null, "admin"),
                    RoleId = 1
                });

            modelBuilder.Entity<ProductType>().HasData(
                new ProductType
                {
                    ProductTypeId = 1,
                    Name = "Виноградные"
                },
                new ProductType
                {
                    ProductTypeId = 2,
                    Name = "Ягодные"
                },
                new ProductType
                {
                    ProductTypeId = 3,
                    Name = "Многосортные"
                }
            );
            modelBuilder.Entity<ProductType>().HasData(
                new ProductType
                {
                    ProductTypeId = 4,
                    Name = "Сухое",
                },
                new ProductType
                {
                    ProductTypeId = 5,
                    Name = "Сладкое",
                },
                new ProductType
                {
                    ProductTypeId = 6,
                    Name = "Белое",
                },
                new ProductType
                {
                    ProductTypeId = 7,
                    Name = "Красное",
                }
            );
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    ProductId = 1,
                    Count = 5,
                    Price = 10,
                    Name = "Виноградное вино",
                    ProductTypeId = 1,
                    Image = "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg",
                    About = "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока..."

                },
                new Product
                {
                    Count = 5,
                    Price = 10,
                    ProductId = 2,
                    Name = "Ягодное вино",
                    ProductTypeId = 2,
                    Image = "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg",
                    About = "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока..."
                },
                new Product
                {
                    Count = 10,
                    Price = 20,
                    ProductId = 3,
                    Name = "Многосортное вино",
                    ProductTypeId = 3,
                    Image = "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg",
                    About = "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока..."
                },
                new Product
                {
                    Count = 0,
                    Price = 15,
                    ProductId = 4,
                    Name = "Виноградное сухое вино",
                    ProductTypeId = 4,
                    Image = "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg",
                    About = "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока..."
                },
                new Product
                {
                    Count = 3,
                    Price = 12,
                    ProductId = 5,
                    Name = "Виноградное сладкое вино",
                    ProductTypeId = 5,
                    Image = "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg",
                    About = "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока..."
                },
                new Product
                {
                    Count = 5,
                    Price = 11,
                    ProductId = 6,
                    Name = "Ягодное белое вино",
                    ProductTypeId = 6,
                    Image = "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg",
                    About = "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока..."
                },
                new Product
                {
                    Count = 5,
                    Price = 10,
                    ProductId = 7,
                    Name = "Ягодное красное вино",
                    ProductTypeId = 7,
                    Image = "https://kvz1926.com/img/2018/11/wine-cabernet-dry-red.jpg",
                    About = "Вино́ — алкогольный напиток (крепость: натуральных — 9—16 % об., креплёных — 16—22 % об.), получаемый полным или частичным спиртовым брожением виноградного сока..."
                }
            );
            modelBuilder.Entity<Table>().HasData(
                new Table
                {
                    TableId = 1,
                    MaxPerson = 5
                },
                new Table
                {
                    TableId = 2,
                    MaxPerson = 4
                });
            modelBuilder.Entity<Rezervation>().HasData(
                new Rezervation
                {
                    RezervationId = 1,
                    TableId = 1,
                    PersonName = "Тест",
                    Items = new List<Ord>()
                    {
                        new Ord
                        {
                            Id = 1,
                            ProductId = 1,
                            Count =1
                        },
                        new Ord
                        {
                            Id = 2,
                            ProductId = 2,
                            Count =2
                        },
                        new Ord
                        {
                            Id = 3,
                            ProductId = 3,
                            Count =3
                        }
                    },
                    RezervationDate = DateTime.ParseExact("25.05.2020 12:30", "dd.MM.yyyy HH:mm", System.Globalization.CultureInfo.InvariantCulture)
                }
            );
        }


        public DbSet<Person> Persons { get; set; }
        public DbSet<Rezervation> Rezervations { get; set; }
        public DbSet<Table> Tables { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
    }
}
