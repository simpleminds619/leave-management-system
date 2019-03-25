using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Filters;

namespace LeaveManagementSystem.Api.Filters
{
    public class ExecutionContextFilter : IActionFilter
    {
        public ExecutionContextFilter(IHostingEnvironment environment)
        {
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var routeData = context.RouteData;
            ExecutionContext.Set("Action", routeData.Values["action"]);
            ExecutionContext.Set("Controller", routeData.Values["controller"]);
        }
    }
}
