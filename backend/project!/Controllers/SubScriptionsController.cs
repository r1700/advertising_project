using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL;
using BLL;
using Microsoft.AspNetCore.Cors;

namespace project_.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    [EnableCors]
    public class SubScriptionsController : ControllerBase
    {

        private IRepository<SubScriptions> subScriptionsRepository;

        public SubScriptionsController(IRepository<SubScriptions> subscriptionRepository)
        {
            this.subScriptionsRepository = subscriptionRepository;

        }

        [HttpGet("get/{id}")]
        public IActionResult GetsubscriptionById(int id)
        {
            try
            {
                SubScriptions p = subScriptionsRepository.GetById(id);
                if (p == null)
                    return NotFound("the subscription isnot found");//404
                return Ok(p); //יוצר קוד 200 ביחד עם החזרת האובייקט  
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }
        [HttpGet("get")]
        public IActionResult GetSubScription()
        {
            try
            {
                List<SubScriptions> p = subScriptionsRepository.GetAll();
                if (p == null)
                    return NotFound("the subscription isnot found");//404
                return Ok(p); //יוצר קוד 200 ביחד עם החזרת האובייקט  
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }
        [HttpPost("add")]
        public ActionResult<SubScriptions> Addsubscription(SubScriptions p)
        {

            try
            {
                //ModelState-המצב של המודל - מסד הנתונים
                //IsValid- האם תקין
                if (p == null || !ModelState.IsValid)
                    return BadRequest();//בקשה שאינה תקינה
                SubScriptions subscription = subScriptionsRepository.GetById(p.Id);
                if (subscription != null)
                    //מנסים להכניס אובייקט קיים
                    return BadRequest("try to add exist product");
                subScriptionsRepository.Add(p);
                //להחזיר אובייקט החדש שנוצר עם הקוד החדש
                //ומחזיר סטטוס של 201
                return CreatedAtAction(nameof(Addsubscription), new { id = p.Id }, p);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }
        [HttpPut("update/{id}")]
        public IActionResult Updatesubscription(int id, SubScriptions p)
        {
            try
            {
                if (p == null || !ModelState.IsValid)
                    return BadRequest();//בקשה שאינה תקינה
                if (id != p.Id)
                    return Conflict();
                return CreatedAtAction(nameof(Updatesubscription), new { id = p.Id }, subScriptionsRepository.Update(p));
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
                SubScriptions subscription = subScriptionsRepository.GetById(id);
                if (subscription == null)
                {
                    return NotFound();
                }
                subScriptionsRepository.Delete(subscription);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }
    }
}


