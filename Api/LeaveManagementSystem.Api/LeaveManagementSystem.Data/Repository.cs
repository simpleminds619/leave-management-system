using System.Data;

namespace LeaveManagementSystem.Data
{
    public class Repository
    {
        private readonly TransactionManager m_transactionManager;

        public Repository(TransactionManager transactionManager)
        {
            m_transactionManager = transactionManager;
        }

        public IDbTransaction Transaction => m_transactionManager.Transaction;

        public IDbConnection Connection => m_transactionManager.Connection;
    }
}