using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer.Dtos
{
    public class ViewComment
    {
        public long Id { get; set; } // commentId
        public string UserId { get; set; }
        public string UserName { get; set; }
        public DateTime DateCreated { get; set; }
        public string Body { get; set; }
        public long PostId { get; set; }
        public List<ViewReply> Replies { get; set; }
    }
}
