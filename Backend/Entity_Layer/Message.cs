using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer
{
    public class Message : Parent
    {
        // inherits Id, User, UserId, DateCreated from Parent
        public string Body { get; set; }
        public string To { get; set; }
        [ForeignKey("To")]
        public User ToUser { get; set; }
    }
}
