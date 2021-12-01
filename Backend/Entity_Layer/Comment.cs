using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer
{
    public class Comment : Parent
    {
        [Required]
        [MinLength(1)]
        public string Body { get; set; }
        public long PostId { get; set; }
        public Post Post { get; set; }
        public IEnumerable<Reply> Replies { get; set; }
    }
}
