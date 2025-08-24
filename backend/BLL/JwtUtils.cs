using DAL;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    //מטפלת בטוקן
    public class JwtUtils
    {
        public static string CreateToken(Users u)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            //נייצר את הקוד הסודי של השרת
            var key = Encoding.ASCII.GetBytes("veryveryverysecret...................................................");
            //נשמור את התפקידים של המשתמש בתוך הטוקן
            var identity = new ClaimsIdentity(new Claim[]
            {
              //  new Claim(ClaimTypes.Role,u.Role),
                new Claim(ClaimTypes.Name,$"{u.Name}")
            });

            //נייצר את החתימה
            var credintails = new SigningCredentials(new SymmetricSecurityKey(key)
                , SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddMinutes(2),
                SigningCredentials = credintails
            };
            //מייצר טוקן
            var token=jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
