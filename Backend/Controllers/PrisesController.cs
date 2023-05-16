using Backend.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrisesController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public PrisesController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Backend.Entities.ProductHasPrice>> GetPriceByID([FromRoute] long id)
        {
            //var product = await _context.Products.FirstOrDefaultAsync(q => q.Id == id);
            var prises = await _context.ProductHasPrice.Where(x => x.ProductId == id).ToListAsync();
            if (prises is null)
            {
                return NotFound("Prises Not Found");
            }
            return Ok(prises);
        }

    }
}
