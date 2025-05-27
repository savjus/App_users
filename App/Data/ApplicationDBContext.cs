using App.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace App.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {
        } 
        public DbSet<Employee> Employees { get; set; }
    }
}
