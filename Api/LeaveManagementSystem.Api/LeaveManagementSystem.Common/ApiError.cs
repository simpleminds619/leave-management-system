using System;
using System.Collections.Generic;
using System.Text;

namespace LeaveManagementSystem.Api
{
    public class ApiError
    {
        public string Message { get; set; }

        public string Type { get; set; }

        public IEnumerable<string> DebugInfo { get; set; }

        public IDictionary<string, object> Data { get; set; }
    }
}
