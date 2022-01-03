using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer
{
    // this table holds which is the current profile pic of a user
    // one image per user
    // i. ProfilePicture - User (one to one relationship)
    // ii. ProfilePicture - Image {one to one relationship) image can be null in case no profile pic chosen
    public class ProfilePicture
    {
        public long Id { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public string UserId { get; set; }
        public long? ImageId { get; set; } = null; // initially no profile picture a user will have
        public User User { get; set; }
        public Image Image { get; set; }
    }
}
