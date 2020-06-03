using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace View.Options
{
    public class AuthOptions
    {
        public const string ISSUER = "MyAuthServer"; 
        public const string AUDIENCE = "MyAuthClient"; 
        const string KEY = "MIIEpAIBAAKCAQEAuF2efa145m7oW2U0uE/Nh9yMHJATXr0ivNR1wA4LOCt7opUeiQ81C4+khw9GK3/5Jdz5otB8n+FtI8kCBomCCrRKNcuNNoT5cPm1CKoq8Gp1oMbSdIaJm63Plauiuv8MXVYofSSRA/zR5OYIx5tC7+Ch7Vv1gkZxf1ctH0YD6Tf5D29ezDZKD6mNhWEKPg19KZlXAZ0EqCBss1GcxZ5Bi7aBBlNkyDJbuF8z0r1Rw91KISeyVe5atDy1WgDlAC6C9poh7PP5Ay+k0r67gU40rDxrsvIDQxhbNCcl/Ko9ThmssU/WkK5YQHLNlu+YPYHkC+Sg0GIrkhMDH/dGBhFEOQIDAQABAoIBAQCisAIWdshT1xR06fa+mbUNKWH+JmjhVdbceEK7yei+lShRTHMYkPHHFOcjQygxZIkPj1I+COmgD8VGKa7+48J7/aHqnIcsz+Rpe//y+G5Rni/UQv4dU0cEuDiQo1dC2aMojcnGvEi3ExaIfTDMKsbDdB6PnHEll1G6A8xOZ3M2DO0FdGKD6ClYJIvtKOJgU4/8CDvp1mAVqdDje/g9Jh+oJef97AEKY8NCJNlLHdLkz0m67uGtyHVVWFVwlFFsT4ZalRaVodzMq7hd3ZWTZSFK0IB8RSaZmfZySa2BslrXOGCM0i07bGUZ8X1Gml30s1SjRuwb8ie4MATzHCQ+EDABAoGBAOjSm0HqAjQ1HmBJq1CAQ/pA6EXrO78ZSb/eu1Qb59OrtgldDx1u5UravFIPcJlhTaguNaFZ9BxXaiCxyz0Tq88Nob3AVRH0drOYonBklWKXc1h+gH6CxGTytQyDL1ChwIqqaTfqhc5LNG7kzbBq3F+0l9oPybpNO0MH7KCAZMYBAoGBAMq4Gw8+YcNmmakX5zfQBoA9z8Haj5D/WiwGkKU84XvrcTydRBapjs3GdkkT3W3C7wsKx9U/YLHGsn4YOCBD3x2pyUFR3EkcXPpEpE92tqYEpYpnRJRRDmDpR1s1kQUp3/my7F2GfK3bYVpjZFxqy4uQDDBx0SCyetQ+XzVGDS45AoGBAIe144wLVFeMMvWbW4GkEnu4A+xljsD4g5WUxgrj7UDj0Usp9FqKvprgX29R0qeFIVgL/3Ta00EF7zW5jSc/5SDe6E2L48qAfgR3zw/GgZEjiLennUyg+suA8emmOhk8/9eUN5rBWFeEXL7bHc5cq7IZuX4BP+wZgpay8sonrRYBAoGAQ4cWhHpsSJH558jtnbrvH3L3rQSoRE27dOTu9AwWtJfWTbG5h68NweA1cNxsK27+//ekX5XQGQguVzCsKZtSTGhNgTPKpJQNKNUKwumxqBXuKu+BecKSfpfWzDxIxaaQVHZUpEbza1qj0F9BhEOS8DeYx95yImkx31ezkWR3aYkCgYAiK99htdblsrBUV/+aUrfRXWdwEiVPirV0eb39OfJEwmyM8KWQbv4Q0cAsia/EWz7qeBDIOAmmhNBu1YWYeCztQiDd9SGRCW1nGTrD2L4WgmsZfBIXauXjj7uayBmiqoWvL3FvARn1EBUeBHJgFSp8RjWsKPek8m4Rb6gXmCu+ew==";   
        public const int LIFETIME = 525960;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
