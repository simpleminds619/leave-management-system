using System.Collections.Generic;
using System.Collections.Immutable;
using System.Threading;

namespace LeaveManagementSystem.Api
{
    public partial class ExecutionContext
    {
        private static AsyncLocal<IImmutableDictionary<string, object>> current = new AsyncLocal<IImmutableDictionary<string, object>>();

        private static IImmutableDictionary<string, object> Value
        {
            get
            {
                var value = current.Value;
                if (value == null)
                {
                    value = new Dictionary<string, object>().ToImmutableDictionary();
                    current.Value = value;
                }

                return value;
            }
            set
            {
                current.Value = value;
            }
        }

        public static IReadOnlyDictionary<string, object> Current
        {
            get
            {
                return Value;
            }
        }

        public static void Set(string key, object value)
        {
            Value = Value.SetItem(key, value);
        }

        public static void Set(IEnumerable<KeyValuePair<string, object>> items)
        {
            Value = Value.SetItems(items);
        }

    }
}