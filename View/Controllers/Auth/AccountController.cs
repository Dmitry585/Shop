using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using EntityDatabase.Data;
using View.Options;
using EntityDatabase.Data.Repositories;
using Model.Models;
using Helpers.Helpers;
using EntityDatabase.Data.Modifications;
using System.Threading.Tasks;

namespace View.Controllers.Auth
{
    public class AccountController : Controller
    {
        private readonly ApplicationContext _context;
        // тестовые данные вместо использования базы данных
        public AccountController(ApplicationContext context)
        {
            this._context = context;
        }

        [HttpPost("/register")]
        public async Task<IActionResult> Register(Person person)
        {
            var pmd = new PersonModification(_context);
            var password = person.Password;
            await pmd.CreatePerson(person);
            var result = GetToken(person.Login, password);
            if (result != null)
            {
                return Json(result);
            }
            else
            {
                return BadRequest(new { errorText = "Пользователь с данным логином уже существует" });
            }
        }

        [HttpPost("/login")]
        public IActionResult Token(string login, string password)
        {
            var response = GetToken(login, password);
            if(response == null)
                return BadRequest(error: "Пользователь не найден");

            return Json(response);
        }

        private object GetToken(string login,string password)
        {
            var identity = GetIdentity(login, password);
            if (identity == null)
            {
                return null;
            }
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            var roleName = (identity.Claims as List<Claim>)[1].Value;
            return new
            {
                access_token = encodedJwt,
                role = roleName
            };
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            PersonRepository pr = new PersonRepository(_context);
            Person person = pr.GetPersonByLogin(username);
            if (person != null)
            {
                PersonPasswordHasher pph = new PersonPasswordHasher();
                var result = pph.VerifyHashedPassword(person, person.Password, password);
                if (result == Microsoft.AspNetCore.Identity.PasswordVerificationResult.Failed)
                {
                    return null;
                }
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role.Name)
                };
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }
            return null;
        }

    }
}