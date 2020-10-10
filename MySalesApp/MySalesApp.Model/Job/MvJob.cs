using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MySalesApp.Model.Job
{
    public class MvAddJob
    {
      
        public string jobDescription { get; set; }
        [Required]
        public string organizationId { get; set; }
        [Required]
        public int insertPersonId { get; set; }



    }
}