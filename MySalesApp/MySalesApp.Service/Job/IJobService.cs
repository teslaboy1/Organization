using MySalesApp.Model.Customer;
using MySalesApp.Model.Employee;
using MySalesApp.Model.Job;
using System;
using System.Collections.Generic;
using System.Text;

namespace MySalesApp.Service.Job
{
    public interface IJobService
    {
        bool AddJob(MvAddJob job);
        dynamic GetAllJobDetail();

    }
}