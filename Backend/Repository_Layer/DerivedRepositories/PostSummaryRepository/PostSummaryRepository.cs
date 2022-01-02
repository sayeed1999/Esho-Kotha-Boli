using Data_Access_Layer;
using Entity_Layer;
using Entity_Layer.Dtos;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Repository_Layer.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.DerivedRepositories.PostSummaryRepository
{
    public class PostSummaryRepository : Repository<PostSummary>, IPostSummaryRepository
    {
        public PostSummaryRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }
        public async Task<Response<IEnumerable<PostSummary>>> GetAllPostSummary(int page, int count)
        {
            Response<IEnumerable<PostSummary>> response = new();
            var param01 = new SqlParameter("@page", page);
            var param02 = new SqlParameter("@count", count);
            IEnumerable<PostSummary> posts = await base.FromSql("execute dbo.spGetAllPostSummary @page, @count", param01, param02).ToListAsync();
            response.Data = posts;
            return response;
        }

        public async Task<Response<IEnumerable<PostSummary>>> GetAllPostSummaryByUser(string username, int page, int count)
        {
            Response<IEnumerable<PostSummary>> response = new();
            var param00 = new SqlParameter("@username", username);
            var param01 = new SqlParameter("@page", page);
            var param02 = new SqlParameter("@count", count);
            IEnumerable<PostSummary> posts = await base.FromSql("execute dbo.spGetAllPostSummaryByUser @username, @page, @count", param00, param01, param02).ToListAsync();
            response.Data = posts;
            return response;
        }

    }
}
