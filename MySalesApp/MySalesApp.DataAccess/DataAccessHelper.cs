using System;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;

namespace MySalesApp.DataAccess
{
    public class DataAccessHelper
    {
        private SqlConnection _con;
        private string _connectionString;

        public DataAccessHelper(string connectionString)
        {
            _connectionString = connectionString;
        }

        public SqlConnection GetConnection()
        {
            try
            {
                SetConnection();
                return _con;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void SetConnection()
        {
            _con = new SqlConnection(_connectionString);
            if (_con.State == ConnectionState.Closed)
            {
                _con.Open();
            }
            else
            {
                _con.Close();
                _con.Open();
            }
        }

        public dynamic GetJson(SqlDataReader reader)
        {
            var dataTable = new DataTable();
            dataTable.Load(reader);

            if (dataTable.Rows[0] != null && dataTable.Rows[0]["json"].ToString() != "")
            {
                return JsonConvert.DeserializeObject(dataTable.Rows[0]["json"].ToString());
            }
            else
            {
                return null;
            }
        }
    }
}

