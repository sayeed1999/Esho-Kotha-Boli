using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity_Layer.Dtos
{
    public class ViewUser
    {
        public string UserName { get; set; }
        
        public string Email { get; set; }
        
        public string FirstName { get; set; }
        
        public string LastName { get; set; }
        
        public DateTime DateOfBirth { get; set; }

        public byte SexId { get; set; }
        public string Sex { get; set; }
        
        public byte RelationshipStatusId { get; set; }
        public string RelationshipStatus { get; set; }
    }
}
