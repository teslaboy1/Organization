using Microsoft.AspNetCore.Mvc;
using MySalesApp.Model.Customer;
using MySalesApp.Model.Employee;
using MySalesApp.Model.Job;
using MySalesApp.Service.Customer;
using MySalesApp.Service.Employee;
using MySalesApp.Service.Job;
using MySalesApp.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MySalesApp.WebApi.Areas.Job
{
    public class JobController : BaseController
    {
        private IJobService _jobService;

        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public IActionResult AllJobDetail()
        {
            try
            {
                dynamic jsonString = _jobService.GetAllJobDetail();
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public IActionResult AddJob([FromBody] MvAddJob job)
        {
            try
            {
                var added = _jobService.AddJob(job);
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