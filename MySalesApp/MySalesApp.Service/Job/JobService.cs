﻿using Microsoft.Extensions.Configuration;
using MySalesApp.DataAccess;
using MySalesApp.Model.Customer;
using MySalesApp.Model.Employee;
using MySalesApp.Model.Job;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace MySalesApp.Service.Job
{
    public class JobService : IJobService
    {
        private DataAccessHelper _da;
        private readonly string _connectionString;
        private readonly int _commandTimeout;
        private IConfiguration _configuration;


        public JobService(IConfiguration configuration)
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
        public dynamic GetAllJobDetail()
        {
            using (var con = _da.GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SpAllJobDetailSel";
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

        public bool AddJob(MvAddJob job)
        {
            using (var con = _da.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(job);
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SpJobIns";
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

    }
}