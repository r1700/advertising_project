using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL;
using BLL;
using Microsoft.AspNetCore.Cors;
using BCrypt.Net;


namespace project_.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    [EnableCors]
    public class UsersController : ControllerBase
    {
        private IRepository<Users> userRepository;
        private IRepositoryUser<Users> userRepository2;



        public UsersController(IRepository<Users> userRepository, IRepositoryUser<Users> userRepository2)
        {
            this.userRepository = userRepository;
            this.userRepository2 = userRepository2;
        }

        [HttpGet("get/{id}")]
        public IActionResult GetUserById(int id)
        {
            try
            {
                Users p = userRepository.GetById(id);
                if (p == null)
                    return NotFound("the user isnot found");//404
                return Ok(p); //יוצר קוד 200 ביחד עם החזרת האובייקט  
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }



        [HttpGet("get")]
        public IActionResult GetUsers()
        {
            try
            {
                List<Users> p = userRepository.GetAll();
                if (p == null)
                    return NotFound("the user isnot found");//404
                return Ok(p); //יוצר קוד 200 ביחד עם החזרת האובייקט  
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpPost("add")]
        public ActionResult<Users> AddUser(Users p)
        {
            try
            {
                //ModelState-המצב של המודל - מסד הנתונים
                //IsValid- האם תקין
                if (p == null || !ModelState.IsValid)
                    return BadRequest("bad Request!!!!1");//בקשה שאינה תקינה
                Users user = userRepository2.GetByEmailAndPassword(p.Email, p.Password);
                if (user != null)
                    //מנסים להכניס אובייקט קיים
                    return Conflict("try to add exist user2");
                //return EntityAlreadyExists
                //p.Password = BCrypt.Net.BCrypt.HashPassword(p.Password);
                //p.Role = "User";

                userRepository.Add(p);
                //להחזיר אובייקט החדש שנוצר עם הקוד החדש
                //ומחזיר סטטוס של 201
                return CreatedAtAction(nameof(AddUser), new { id = p.Id }, p);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpPut("update/{id}")]
        public IActionResult Updateuser(int id, Users p)
        {
            try
            {
                if (p == null || !ModelState.IsValid)
                    return BadRequest();//בקשה שאינה תקינה
                if (id != p.Id)
                    return Conflict();
                return CreatedAtAction(nameof(Updateuser), new { id = p.Id }, userRepository.Update(p));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            try
            {
                Users user = userRepository.GetById(id);
                if (user == null)
                {
                    return NotFound();
                }
                userRepository.Delete(user);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpPost("getUser")]
        public IActionResult GetUserByDetails(Users u)
        {
            try
            {
                Users p = userRepository2.GetByEmailAndPassword(u.Email, u.Password);
                //Users p = userRepository.GetByDetailes(user);
                if (p == null)
                    return NotFound("the user isnot found");//404

                string token = JwtUtils.CreateToken(u);
                //return Ok(token);
                return Ok(p); //יוצר קוד 200 ביחד עם החזרת האובייקט
            }
            catch (Exception ex)
            {
            
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }
    }
}

