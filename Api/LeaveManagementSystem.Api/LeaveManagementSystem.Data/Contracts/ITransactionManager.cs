using System;
using System.Data;

namespace LeaveManagementSystem.Data.Contracts
{
    public interface ITransactionManager : IDisposable
    {
        IDbConnection Connection { get; }

        IDbTransaction Transaction { get; }

        ITransactionScope Create(IsolationLevel level);

        void Reset();
    }
}