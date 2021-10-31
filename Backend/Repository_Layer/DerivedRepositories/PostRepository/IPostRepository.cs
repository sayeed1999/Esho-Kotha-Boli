using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity_Layer;
using Repository_Layer.GenericRepository;

namespace Repository_Layer.DerivedRepositories.PostRepository
{
    public interface IPostRepository : IRepository<Post>
    {
        public Task<Response<IEnumerable<Post>>> GetAllPostSummary(int page);
    }
}
