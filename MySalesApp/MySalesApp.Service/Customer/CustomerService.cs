using Microsoft.Extensions.Configuration;
using MySalesApp.DataAccess;
using MySalesApp.Model.Customer;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace MySalesApp.Service.Customer
{
    public class CustomerService : ICustomerService
    {
        private DataAccessHelper _da;
        private readonly string _connectionString;
        private readonly int _commandTimeout;
        private IConfiguration _configuration;


        public CustomerService(IConfiguration configuration)
        {
            _configuration = configuration;
            dynamic connectionString = _configuration.GetSection("ConnectionString");
            _connectionString = connectionString["DefaultConnection"];

            if (_connectionString != null)
            {
                _da = new DataAccessHelper(_connectionString);
            }

            _commandTimeout = Convert.ToInt32(connectionString["CommandTimeout"]);
        }
        public dynamic GetAllCustomerDetail()
        {
            using (var con = _da.GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SpAllCustomerDetailSel";
                cmd.CommandTimeout = _commandTimeout;

                using (SqlDataReader redr = cmd.ExecuteReader())
                {
                    try
                    {
                        if (redr.HasRows)
                        {
                            return _da.GetJson(redr);
                        }
                        else
                        {
                            return null;
                        }
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }


            }
        }

        public bool AddCustomer(MvAddCustomer customer)
        {
            using (var con = _da.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(customer);
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SpCustomerInsTsk";
                cmd.Parameters.Add("@Json", SqlDbType.NVarChar).Value = jsonNew;
                cmd.CommandTimeout = _commandTimeout;

                int rows = cmd.ExecuteNonQuery();

                if (rows > 0)
                {
                    return true;
                }
                return false;


            }
        }

 /*       public bool EditCustomer(MvEditCustomer customer)
        {
            using (var con = _da.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(customer);
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SpCustomerUpd_OUTPUT";
                cmd.Parameters.Add("@Json", SqlDbType.NChar).Value = jsonNew;
                cmd.CommandTimeout = _commandTimeout;

                int rows = cmd.ExecuteNonQuery();

                if (rows > 0)
                {
                    return true;
                }
                return false;


            }
        }
*/

    }
}
