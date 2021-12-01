using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer
{
    public class Reply : Parent
    {
        [Required]
        [MinLength(1)]
        public string Body { get; set; }
        public long CommentId { get; set; }
        public Comment Comment { get; set; }
    }
}
