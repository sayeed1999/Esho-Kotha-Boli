using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer.Dtos
{
    public class PostSummary
    {
        public long Id { get; set; } // Id of PostSummary is the Id of the Post. that is, the PK(primary key)
        public string UserName { get; set; }
        public string FullName { get; set; }
        public DateTime DateCreated { get; set; }
        public string Body { get; set; }
        public long CommentsCount { get; set; }
        public long RepliesCount { get; set; }
    }
}
