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
    public class PurchaseController : ControllerBase
    {
        private IRepository<Purchase> purchaseRepository;
        private IRepositoryByUser<Purchase> purchaseRepository2;

        public PurchaseController(IRepository<Purchase> purchaseRepository, IRepositoryByUser<Purchase> purchaseRepository2)
        {
            this.purchaseRepository = purchaseRepository;
            this.purchaseRepository2 = purchaseRepository2;
        }

        [HttpGet("get/{id}")]
        public IActionResult GetpurchaseById(int id)
        {

            try
            {
                Purchase p = purchaseRepository.GetById(id);
                if (p == null)
                    return NotFound("the purchase isnot found");//404
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
                List<Purchase> p = purchaseRepository.GetAll();
                if (p == null)
                    return NotFound("the purchase isnot found");//404
                return Ok(p); //יוצר קוד 200 ביחד עם החזרת האובייקט  
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpGet("getActive")]
        public IActionResult GetActive()
        {
            try
            {
                //  List<Purchase> p = purchaseRepository2.GetActivePurchase();
                //  if (p == null)
                //  {
                //      return NotFound("not found");
                //  }
                //return Ok(p);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpPost("add")]
        public ActionResult<Purchase> Addpurchase(Purchase p)
        {
            try
            {
                if (p == null || !ModelState.IsValid)
                    return BadRequest();//בקשה שאינה תקינה
                Purchase purchase = purchaseRepository.GetById(p.Id);
                //if (purchase != null)
                //    //מנסים להכניס אובייקט קיים
                //    return BadRequest("try to add exist Purchase");
                purchaseRepository.Add(p);
                //להחזיר אובייקט החדש שנוצר עם הקוד החדש
                //ומחזיר סטטוס של 201
                return CreatedAtAction(nameof(Addpurchase), new { id = p.Id }, p);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpPut("update/{id}")]
        public IActionResult Updatepurchase(int id, Purchase p)
        {
            try
            {
                if (p == null || !ModelState.IsValid)
                    return BadRequest();//בקשה שאינה תקינה
                if (id != p.Id)
                    return Conflict();
                return CreatedAtAction(nameof(Updatepurchase), new { id = p.Id }, purchaseRepository.Update(p));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }
        [HttpDelete("delete/{id}")]
        public IActionResult Delete1(int id)
        {
            try
            {
                Purchase purchase = purchaseRepository.GetById(id);
                if (purchase == null)
                {
                    return NotFound(id);
                }
                purchaseRepository.Delete(purchase);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpPost("getPurchase")]
        public IActionResult GetpurchaseByUser(Users u)
        {
            try
            {
                List<Purchase> p = purchaseRepository2.GetByUser(u);
                if (p == null)
                    return NotFound("no Purchase");//404
                return Ok(p); //יוצר קוד 200 ביחד עם החזרת האובייקט  
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }
    }
}

