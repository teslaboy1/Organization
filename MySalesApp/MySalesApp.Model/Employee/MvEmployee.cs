using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MySalesApp.Model.Employee
{
    public class MvAddEmployee
    {
        [Required]
        public string firstName { get; set; }
        public string middleName { get; set; }
        [Required]
        public string surname { get; set; }
        [Required]
        public int insertPersonId { get; set; }
        [Required]
        public string city { get; set; }
        public string email { get; set; }
        [Required]
        public string phone { get; set; }


    }
}