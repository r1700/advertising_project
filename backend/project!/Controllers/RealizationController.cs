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
    public class RealizationController : ControllerBase
    {

        private IRepository<Realization> realizationRepository;
        private IRepositoryByUser<Realization> realizationRepository2;
        private IRepository<Purchase> purchaseRepository;
        public RealizationController(IRepository<Realization> realizationRepository, IRepositoryByUser<Realization> realizationRepository2, IRepository<Purchase> purchaseRepository)
        {
            this.realizationRepository = realizationRepository;
            this.realizationRepository2 = realizationRepository2;
            this.purchaseRepository = purchaseRepository;
        }

        [HttpGet("get/{id}")]
        public IActionResult GetrealizationById(int id)
        {
            try
            {
                Realization p = realizationRepository.GetById(id);
                if (p == null)
                    return NotFound("the realization isnot found");//404
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
                List<Realization> p = realizationRepository.GetAll();
                if (p == null)
                    return NotFound("the realization isnot found");//404
                return Ok(p); //יוצר קוד 200 ביחד עם החזרת האובייקט  
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpPost("add")]
        public ActionResult<Realization> Addrealization(Realization p)
        {
            try
            {
                if (p == null || !ModelState.IsValid)
                    return BadRequest();//בקשה שאינה תקינה
                Realization realization = realizationRepository.GetById(p.Id);
                if (realization != null)
                    //מנסים להכניס אובייקט קיים
                    return BadRequest("try to add exist product");
                realizationRepository.Add(p);
                //update purchase, pointbalance-1

                //עדכון רכישה לאחר הוספת מימוש
                Purchase purchaseToUpdate = purchaseRepository.GetById(p.PurchaseId);
                if (purchaseToUpdate != null)
                {
                    purchaseToUpdate.PointsBalance -= 1; 
                    purchaseRepository.Update(purchaseToUpdate); 
                }
                else
                {
                    // טיפול במקרה שהרכישה לא נמצאה
                    return NotFound("Related Purchase not found.");
                }

                return CreatedAtAction(nameof(Addrealization), new { id = p.Id }, p);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding realization: " + ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public IActionResult Updaterealization(int id, Realization p)
        {
            try
            {
                if (p == null || !ModelState.IsValid)
                    return BadRequest();//בקשה שאינה תקינה

                if (id != p.Id)
                    return Conflict();
                return CreatedAtAction(nameof(Updaterealization), new { id = p.Id }, realizationRepository.Update(p));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Realization realization = realizationRepository.GetById(id);
                if (realization == null)
                {
                    return NotFound();
                }
                realizationRepository.Delete(realization);
                // עדכון רכישה לאחר מחיקת מימוש
                Purchase purchaseToUpdate = purchaseRepository.GetById(realization.PurchaseId);
                if (purchaseToUpdate != null)
                {
                    purchaseToUpdate.PointsBalance += 1; 
                    purchaseRepository.Update(purchaseToUpdate); 
                }
                else
                {
                    // טיפול במקרה שהרכישה לא נמצאה
                    return NotFound("Related Purchase not found.");
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }
        [HttpPost("getRealization")]
        public IActionResult GetRealizationByUser(Users u)
        {
            try
            {
                List<Realization> p = realizationRepository2.GetByUser(u);
                if (p == null)
                    return NotFound("no Realization");//404
                return Ok(p); //יוצר קוד 200 ביחד עם החזרת האובייקט  
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }
    }
}

