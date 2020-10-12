using Microsoft.AspNetCore.Mvc;
using MySalesApp.Model.Assignment;
using MySalesApp.Model.Customer;
using MySalesApp.Model.Employee;
using MySalesApp.Service.Assignment;
using MySalesApp.Service.Customer;
using MySalesApp.Service.Employee;
using MySalesApp.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MySalesApp.WebApi.Areas.Assignment
{
    public class AssignmentController : BaseController
    {
        private IAssignmentService _assignmentService;

        public AssignmentController(IAssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }

        [HttpGet]
        public IActionResult AllAssignmentDetail()
        {
            try
            {
                dynamic jsonString = _assignmentService.GetAllAssignmentDetail();
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
 
        [HttpPost]
        public IActionResult AddAssignment([FromBody] MvAddAssignment assignment)
        {
            try
            {
                var added = _assignmentService.AddAssignment(assignment);
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