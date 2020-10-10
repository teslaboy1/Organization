using MySalesApp.Model.Customer;
using MySalesApp.Model.Employee;
using System;
using System.Collections.Generic;
using System.Text;

namespace MySalesApp.Service.Employee
{
    public interface IEmployeeService
    {
        bool AddEmployee(MvAddEmployee employee);
        dynamic GetAllEmployeeDetail();
        
    }
}