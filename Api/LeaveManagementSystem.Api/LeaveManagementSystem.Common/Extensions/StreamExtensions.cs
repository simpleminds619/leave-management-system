using Newtonsoft.Json;
using System.IO;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Extensions
{
    public static class StreamExtensions
    {
        public static Task<T> JsonDeserializeAsync<T>(this Stream stream)
        {
            return Task.Run(() =>
            {
                T result = default(T);

                StreamReader requestReader = new StreamReader(stream);
                using (JsonTextReader jsonReader = new JsonTextReader(requestReader))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    result = serializer.Deserialize<T>(jsonReader);
                }

                return result;
            });
        }
    }
}