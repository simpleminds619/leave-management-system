using System;
using System.Linq;

namespace LeaveManagementSystem.Api.Attributes
{
    [AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = true)]
    public sealed class ResultNameAttribute : Attribute
    {
        public string Name { get; }

        public ResultNameAttribute(string name)
        {
            Name = name;
        }
    }
}