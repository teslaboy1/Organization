using Microsoft.AspNetCore.Mvc;
using MySalesApp.Model.Customer;
using MySalesApp.Model.Employee;
using MySalesApp.Service.Customer;
using MySalesApp.Service.Employee;
using MySalesApp.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MySalesApp.WebApi.Areas.Employee
{
    public class EmployeeController : BaseController
    {
        private IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public IActionResult AllEmployeeDetail()
        {
            try
            {
                dynamic jsonString = _employeeService.GetAllEmployeeDetail();
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public IActionResult AddEmployee([FromBody] MvAddEmployee employee)
        {
            try
            {
                var added = _employeeService.AddEmployee(employee);
                if (!added)
                {
                    return BadRequest();
                }
                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}