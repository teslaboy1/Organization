using MySalesApp.Model.Assignment;
using MySalesApp.Model.Customer;
using MySalesApp.Model.Employee;
using System;
using System.Collections.Generic;
using System.Text;

namespace MySalesApp.Service.Assignment
{
    public interface IAssignmentService
    {
        bool AddAssignment(MvAddAssignment assignment);
        //dynamic GetAllAssignmentDetail();

    }
}