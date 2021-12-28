using Microsoft.AspNetCore.Mvc;
using RDLC_Learn_01.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Reporting.NETCore;
using System.IO;
using System;
using System.Linq;

namespace RDLC_Learn_01.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/Reporting")]
    public class ReportingController : ControllerBase
    {
        private IEnumerable<Department> departmentTable = new List<Department>()
        {
            new Department { Id = 1, Name = "Software Engineering!", Capacity = "50" },
            new Department { Id = 2, Name = "Avionics Engineering!!!", Capacity = "60" },
            new Department { Id = 3, Name = "Bio Medicine", Capacity = "25" },
            new Department { Id = 4, Name = "Aeronautics", Capacity = "60" },
        };

        private IEnumerable<Employee> employeeTable = new List<Employee>()
        {
            new Employee() { Name = "Sam", Gender ="male", Email="sam@gmail.com", DepartmentId = 1 },
            new Employee() { Name = "Ella",Gender ="female", Email="Ella@gmail.com", DepartmentId = 1  },
            new Employee() { Name = "TG",Gender ="male", Email ="TG@gmail.com", DepartmentId = 1  },
            new Employee() { Name = "Favor",Gender ="female", Email="Favor@gmail.com", DepartmentId = 1  },
            new Employee() { Name = "Micheal",Gender ="male",Email ="Micheal@gmail.com", DepartmentId = 2  },
            new Employee() { Name = "Joe",Gender ="male", Email ="Joe@gmail.com", DepartmentId = 2  },
            new Employee() { Name="Maintain",Gender ="female",Email ="Maintain@gmail.com", DepartmentId = 2  },
            new Employee() { Name = "Akeem",Gender ="male", Email ="Akeem@gmail.com", DepartmentId = 2  },
            new Employee() { Name = "Boye",Gender ="male", Email ="Boye@gmail.com", DepartmentId = 3  },
            new Employee() { Name ="Chioma",Gender ="female",Email ="Chioma@gmail.com", DepartmentId = 3 },
            new Employee() { Name = "Ofure",Gender ="female", Email ="Ofure@gmail.com", DepartmentId = 3 },
            new Employee() { Name = "Hart",Gender ="male",Email ="Hart@gmail.com", DepartmentId = 4 }
        };

        #region constants
        private const string dir = @"C:\Programming Stuffs\fullstack\Esho-Kotha-Boli\Backend\API_Layer\Released";
        private const string reportType = "pdf";
        private const string ext = "pdf";
        #endregion


        public ReportingController()
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
        }

        [HttpGet]
        [Route("Report1")]
        public IActionResult Report1()
        {
            var lr = new LocalReport();

            var reportPath = "Reporting\\Report1.rdlc";
            lr.ReportPath = reportPath;

            string dataSourceName = "DepartmentDS";
            var rd = new ReportDataSource(dataSourceName, departmentTable);
            lr.DataSources.Add(rd);

            byte[] renderedBytes = lr.Render(
                reportType);

            int countOfFiles = Directory.GetFiles(dir).Length;
            string fileName = $"report{countOfFiles + 1}.{ext}";

            System.IO.File.WriteAllBytes($@"{dir}\{fileName}", renderedBytes);

            return Ok("A pdf has been generated. please check in the storage folder!");
        }

        [HttpGet]
        [Route("Report2")]
        public IActionResult Report2()
        {
            var lr = new LocalReport();

            var path = "Reporting\\Report2.rdlc";
            lr.ReportPath = path;

            string dataSourceName = "Department_DS";
            ReportDataSource rd = new ReportDataSource(dataSourceName, departmentTable);
            lr.DataSources.Add(rd);

            lr.SubreportProcessing += LocalReport_SubreportProcessing;

            byte[] renderedBytes = lr.Render(
                reportType);

            int countOfFiles = Directory.GetFiles(dir).Length;
            string fileName = $"report{countOfFiles + 1}.{ext}";

            System.IO.File.WriteAllBytes($@"{dir}\{fileName}", renderedBytes);

            return Ok("A pdf has been generated. please check in the storage folder!");

        }

        private void LocalReport_SubreportProcessing(object sender, SubreportProcessingEventArgs e)
        {
            var departmentId = Convert.ToInt32(e.Parameters[0].Values[0]);
            var employeegroup = employeeTable.Where(x => x.DepartmentId == departmentId).ToList();
            
            //if (e.ReportPath == "")
            //{
                string dataSourceName = "Employee_DS";
                ReportDataSource rd = new ReportDataSource(dataSourceName, employeegroup);
                e.DataSources.Add(rd);
            //}
        }

    }
}