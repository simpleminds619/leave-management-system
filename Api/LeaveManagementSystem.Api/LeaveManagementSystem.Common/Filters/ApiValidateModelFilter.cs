using Microsoft.AspNetCore.Mvc.Filters;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace LeaveManagementSystem.Api.Filters
{
    public class ApiValidateModelFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var errors = string.Join(". ", context.ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
                throw new ValidationException($"One or more validation errors were discovered in the request: {errors}");
            }
        }
    }
}
