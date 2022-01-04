using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer.Dtos
{
    public class ViewProfilePicture
    {
        public long Id { get; set; }
        public byte[] ByteArray { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
