using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RDLC_Learn_01.Models
{
    public class Department
    {
        private static int Count = 0;
        public Department()
        {
            Id = ++Count;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Capacity { get; set; }
    }
}