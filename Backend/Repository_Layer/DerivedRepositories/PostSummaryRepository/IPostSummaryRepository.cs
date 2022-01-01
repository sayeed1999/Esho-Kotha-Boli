using Entity_Layer;
using Entity_Layer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.DerivedRepositories.PostSummaryRepository
{
    public interface IPostSummaryRepository
    {
        public Task<Response<IEnumerable<PostSummary>>> GetAllPostSummary(int page, int count);
    }
}
