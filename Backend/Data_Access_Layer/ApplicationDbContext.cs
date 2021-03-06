using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity_Layer;
using Entity_Layer.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Data_Access_Layer
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole, string> // User, Role, and Type of the PRIMARY KEY
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<PostSummary> PostSummaries { get; set; } // only for sp, not for db table
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Reply> Replies { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<ProfilePicture> ProfilePictures { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}
