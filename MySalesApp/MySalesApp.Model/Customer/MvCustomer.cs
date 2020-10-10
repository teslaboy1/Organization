using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MySalesApp.Model.Customer
{
    public class MvAddCustomer
    {
        public string organizationName { get; set; }
        public int insertPersonId { get; set; }
        [Required]
        public string city { get; set; }
        public string email { get; set; }
        [Required]
        public string phone { get; set; }


    }

 /*   public class MvEditCustomer
    {
        [Required]
        public int customerId { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string middleName { get; set; }
        [Required]
        public string surname { get; set; }
        [Required]
        public long contactNo { get; set; }
        [Required]
        public int insertPersonId { get; set; }




    }

*/
}
