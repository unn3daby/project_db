using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
namespace Backend.Context
{
    public class DatabaseContext: DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options): base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
            
        }
        public DbSet<Entities.User> Users { get; set; } = null!;
        public DbSet<Entities.Category> Categories { get; set; } = null!;
        public DbSet<Entities.Shop> Shops { get; set; } = null!;
        public DbSet<Entities.Product> Products { get; set; } = null!;
        public DbSet<Entities.ProductHasPrice> ProductHasPrice { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*
            modelBuilder
                .Entity<Entities.Product>()
                .HasMany(c => c.Shops)
                .WithMany(s => s.Products)
                .UsingEntity<Entities.ProductHasPrice>(
                  j => j
                 .HasOne(pt => pt.Product)
                 .WithMany(t => t.ProductHasPrices)
                 .HasForeignKey(pt => pt.ProductId),
                 j => j
                 .HasOne(pt => pt.Shop)
                 .WithMany(t => t.ProductHasPrices)
                 .HasForeignKey(pt => pt.ShopId),
                 j =>
                 {
                     j.Property(pt => pt.Price).HasDefaultValue(50);
                     j.HasKey(t => new { t.ShopId, t.ProductId });
                     j.ToTable("ProductHasPrice");
                 });*/
        }
        

    }
}
