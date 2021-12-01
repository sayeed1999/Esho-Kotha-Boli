using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer
{
    public class Post : Parent
    {
        
        [Required]
        [MinLength(1)]
        public string Body { get; set; }

        public IEnumerable<Comment> Comments { get; set; }
    }
}
