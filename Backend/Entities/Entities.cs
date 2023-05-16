using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Entities
{
    public class User
    {
        [Column("IdUser")]
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public bool isAdmin { get; set; }

        [JsonIgnore]
        public List<Product> Products { get; set; } = new();

    }

    public class Product
    {
        [Column("idProduct")]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
        //public List<Shop> Shops { get; set; } = new();
        public List<Category> Categories { get; set; } = new();
        public List<User> Users { get; set; } = new();
        public List<ProductHasPrice> ProductHasPrices { get; set; } = new();
    }

    public class Category
    {
        [Column("idCategory")]
        public int Id { get; set; }
        public string Name { get; set; }
        
        public List<Product> Products { get; set; } = new();
    }

    public class Shop
    {
        [Column("idShop")]
        
        public int Id { get; set; }
        public string Name { get; set; }
        public string WebURL { get; set; }
        //public List<Product> Products { get; set; } = new();
        [JsonIgnore]
        public List<ProductHasPrice> ProductHasPrices { get; set; } = new();
    }

    public class ProductHasPrice
    {
        [Column("idProductHasPrice")]
        [JsonIgnore]
        public int Id { get; set; }
        public int ProductId { get; set; }
        [JsonIgnore]
        public Product? Product { get; set; }
        public int ShopId { get; set; }
        
        public Shop? Shop { get; set; }
        public int Price { get; set; }
        public DateTime? Date { get; set; }

    }
}
