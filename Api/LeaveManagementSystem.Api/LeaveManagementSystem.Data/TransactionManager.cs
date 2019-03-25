using Dapper;
using LeaveManagementSystem.Data.Contracts;
using System;
using System.Data;

namespace LeaveManagementSystem.Data
{
    public class TransactionManager : ITransactionManager
    {
        private readonly IDbConnection m_dbConnection = null;
        private const string resetQuery = "SET TRANSACTION ISOLATION LEVEL READ COMMITTED";
        private IDbTransaction m_dbTransaction = null;

        public TransactionManager(IDbConnection dbConnection)
        {
            m_dbConnection = dbConnection;
        }

        public IDbConnection Connection => m_dbConnection;

        public IDbTransaction Transaction => m_dbTransaction;

        public ITransactionScope Create(IsolationLevel level)
        {
            if (m_dbConnection.State == ConnectionState.Closed)
            {
                m_dbConnection.Open();
            }

            m_dbTransaction = m_dbConnection.BeginTransaction(level);
            return new TransactionScope(this);
        }

        public void Reset()
        {
            m_dbTransaction = null;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            m_dbConnection.Query(resetQuery);
        }
    }
}