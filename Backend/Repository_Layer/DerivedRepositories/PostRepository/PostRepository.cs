using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data_Access_Layer;
using Entity_Layer;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.GenericRepository;

namespace Repository_Layer.DerivedRepositories.PostRepository
{
    public class PostRepository : Repository<Post>, IPostRepository
    {
        public PostRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public async Task<Response<IEnumerable<Post>>> GetAllPostSummary(int page)
        {
            Response<IEnumerable<Post>> response = new();
            var param01 = new SqlParameter("@page", page);
            // var param02 = new SqlParameter("@number", number);
            IEnumerable<Post> posts = await base.FromSql("execute dbo.spGetAllPostSummary @page", param01).ToListAsync();
            response.Data = posts;
            return response;
        }
    }
}
