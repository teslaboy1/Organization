using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MySalesApp.Model.Assignment
{
    public class MvAddAssignment
    {
        [Required]
        public int employeeId { get; set; }
        [Required]
        public int jobId { get; set; }
        [Required]
        public string status { get; set; }
        [Required]
        public int insertPersonId { get; set; }
      


    }
}