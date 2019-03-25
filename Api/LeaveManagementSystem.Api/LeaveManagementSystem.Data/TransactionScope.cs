using LeaveManagementSystem.Data.Contracts;
using System;

namespace LeaveManagementSystem.Data
{
    public class TransactionScope : ITransactionScope
    {
        private readonly ITransactionManager m_transactionManager;

        public TransactionScope(ITransactionManager transactionManager)
        {
            m_transactionManager = transactionManager;
        }

        public void Commit()
        {
            var transaction = m_transactionManager.Transaction;
            transaction.Commit();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            m_transactionManager.Reset();
        }

        public void Rollback()
        {
            var transaction = m_transactionManager.Transaction;
            transaction.Rollback();
        }
    }
}