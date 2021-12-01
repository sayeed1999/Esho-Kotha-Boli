using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer
{
    public abstract class Parent
    {
        public long Id { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
