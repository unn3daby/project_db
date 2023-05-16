using Backend.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;
using Backend.Entities;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarksController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public BookmarksController(DatabaseContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("{id}")]
        public async Task<IActionResult> CreateBookmark([FromRoute] long id, [FromBody] long idProduct)
        {
            var user = await _context.Users.FirstOrDefaultAsync(q => q.Id == id);
            var product = await _context.Products.FirstOrDefaultAsync(t => t.Id == idProduct);
            if (user == null) return NotFound("User not found!");
            if (product == null) return NotFound("Product not found!");
            user.Products.Add(product);
            product.Users.Add(user);
            //await _context.Products.AddAsync(newProduct);
            await _context.SaveChangesAsync();
            return Ok("Product of user saved");
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<List<Backend.Entities.Product>>> GetMarkedProduct([FromRoute] long id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(q => q.Id == id);
            if(user is null)
            {
                return NotFound("User not found!");
            }
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };
            var products = _context.Products.Include(t => t.Users).Where(p => p.Users.Any(p => p.Id == id)).ToArray();
            //var json = JsonSerializer.Serialize(products, options);

            return Ok(products);
        }
    }
}
