using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer
{
    // when i inherit the class from Parent class, it gives me Id, DateCreated, User, UserId properties.
    public class Image : Parent
    {
        public byte[] byteArray { get; set; }
    }
}
