using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer.Dtos
{
    public class ViewReply
    {
        public long Id { get; set; } // replyId
        public string UserId { get; set; }
        public string UserName { get; set; }
        public DateTime DateCreated { get; set; }
        public string Body { get; set; }
        public long CommentId { get; set; }
    }
}
