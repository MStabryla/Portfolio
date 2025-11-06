using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio
{
    [Route("main")]
    [ApiController]
    public class MainController : ControllerBase
    {
        [Route("")]
        public IActionResult Main()
        {
            return Ok(@"<!DOCTYPE html>
<html>
    <head>
        <title>TEST</title>
    </head>
    <body>
        <h1>TEST</h1>
    </body>
</html>");
        }
    }
}
