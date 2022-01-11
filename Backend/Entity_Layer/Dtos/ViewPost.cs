using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer.Dtos
{
    public class ViewPost
    {
        public long Id { get; set; } // postId
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public DateTime DateCreated { get; set; }
        public string Body { get; set; }
        public List<ViewComment> Comments { get; set; }
    }
}
