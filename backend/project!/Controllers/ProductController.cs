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
    public class ProductController : ControllerBase
    {
        private IRepository<Products> productRepository;

        public ProductController(IRepository<Products> productRepository)
        {
            this.productRepository = productRepository;
        }

        [HttpGet("get/{id}")]
        public IActionResult GetProductById(int id)
        {
            try
            {
                Products p = productRepository.GetById(id);
                if (p == null)
                    return NotFound("the product isnot found");//404
                return Ok(p);  
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
                List<Products> p = productRepository.GetAll();
                if (p == null)
                    return NotFound("the product isnot found");//404
                return Ok(p);   
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpPost("add")]
        public ActionResult<Products> AddProduct(Products p)
        {
            try
            {

                if (p == null || !ModelState.IsValid)
                    return BadRequest();//בקשה שאינה תקינה
                Products product = productRepository.GetById(p.Id);
                if (product != null)
                    //מנסים להכניס אובייקט קיים
                    return BadRequest("try to add exist product");
                productRepository.Add(p);

                return CreatedAtAction(nameof(AddProduct), new { id = p.Id }, p);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpPut("update/{id}")]
        public IActionResult UpdateProduct(int id, Products p)
        {
            try
            {
                if (p == null || !ModelState.IsValid)
                    return BadRequest();//בקשה שאינה תקינה
                if (id != p.Id)
                    return Conflict();
                return CreatedAtAction(nameof(UpdateProduct), new { id = p.Id }, productRepository.Update(p));
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
                Products product = productRepository.GetById(id);
                if (product == null)
                {
                    return NotFound();
                }
                productRepository.Delete(product);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }
    }
}
      
 
