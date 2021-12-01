using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data_Access_Layer;
using Entity_Layer;
using Entity_Layer.Dtos;
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

    }
}
