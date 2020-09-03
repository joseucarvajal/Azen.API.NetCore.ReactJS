using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Azen.API.ExceptionsHandling.Exceptions
{
    public class ZValidatorException : Exception
    {
        public ValidationResult ValidationResult { get; }

        public ZValidatorException(ValidationResult validationResult)
        {
            ValidationResult = validationResult;
        }
    }
}
