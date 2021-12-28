using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RDLC_Learn_01.Models
{
    public class Employee
    {
        private static int Count = 0;
        public Employee()
        {
            Id = ++Count;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public int DepartmentId { get; set; }
    }
}