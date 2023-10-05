using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DocfinderContext : IdentityDbContext<AppUser>
    {
        public DocfinderContext(DbContextOptions<DocfinderContext> options) : base(options)
        {

        }

        public DbSet<Document> Documents { get; set; }
    }
}