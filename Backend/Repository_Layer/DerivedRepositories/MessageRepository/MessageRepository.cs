using Data_Access_Layer;
using Entity_Layer;
using Repository_Layer.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_Layer.DerivedRepositories.MessageRepository
{
    public class MessageRepository : Repository<Message>, IMessageRepository
    {
        public MessageRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }
    }
}
