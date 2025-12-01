using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Models;

namespace Portfolio
{
    [Route("experience")]
    [ApiController]
    public class ExpController : ControllerBase
    {
        [HttpGet]
        [Route("work")]
        public IActionResult GetExperience()
        {
            //template data
            WorkExperience[] workExperienceTemplateData =
            [
                new WorkExperience(
                    "Junior SysOps / .NET Programmer", "Webedia Polska S.A.", "- Developing and maintaining the gry-online.pl website and\nsubpages written in .NET technologies (ASP, Visual Basic)\n- Developing web applications using JavaScript and the Vue.js\nplatform for internal and editorial use\n- Creating and implementing a tool using C#, Windows Forms and\nASP.NET Core with access to the REST API to communicate with\nexternal clients\n- Creating complex SQL queries within few applications. Managing\nand maintaining an MS SQL database\n- Implementation of SysOps and DevOps tools such as PRTG,\nBitbucket, Git, and DeployHQ\n- Administration of test and production environments based on\nWindows Server",new DateOnly(2021, 9, 1), new DateOnly(2025, 6, 30)
                ),
                new WorkExperience(
                    "Unity Programmer",
                    "Apteka Janicki Gallery",
                    "- Creating 2D games in the Unity graphics engine designed for\ntouchscreen monitors\n- More details:\nhttps://web.archive.org/web/20210126050110/https:/wawel.krako\nw.pl/centrum-multimedialne",
                    new DateOnly(2019, 2, 1),
                    new DateOnly(2019, 6, 1)
                ),
                new WorkExperience(
                    "IT Internship",
                    "MedApp S.A.",
                    "- Developing and modifying a mobile application (intended for\ntablets) using Windows UWP technology on the .NET platform\nand C# language\n- Developing WPF applications",
                    new DateOnly(2018, 7, 1),
                    new DateOnly(2018, 8, 31)
                )
            ];

            return Ok(workExperienceTemplateData);
        }
    }
}
