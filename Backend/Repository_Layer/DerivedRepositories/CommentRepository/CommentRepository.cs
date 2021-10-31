using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data_Access_Layer;
using Entity_Layer;
using Repository_Layer.GenericRepository;

namespace Repository_Layer.DerivedRepositories.CommentRepository
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        public CommentRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }
    }
}
