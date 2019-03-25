using System;

namespace LeaveManagementSystem.Data.Contracts
{
    public interface ITransactionScope : IDisposable
    {
        void Commit();

        void Rollback();
    }
}