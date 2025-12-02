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
                    "Junior SysOps / .NET Programmer", "Webedia Polska S.A.", "- Developing and maintaining the gry-online.pl website and subpages written in <b>.NET</b> technologies (<b>ASP</b>, <b>Visual Basic</b>)<br/>- Developing web applications using <b>JavaScript</b> and the <b>Vue.js</b> platform for internal and editorial use<br/>- Creating and implementing a tool using <b>C#</b>, <b>Windows Forms</b> and <b>ASP.NET Core</b> with access to the <b>REST API</b> to communicate with external clients<br/>- Creating complex <b>SQL</b> queries within few applications. Managing and maintaining an <b>MS SQL</b> database<br/>- Implementation of SysOps and DevOps tools such as <b>PRTG</b>, <b>Bitbucket</b>, <b>Git</b>, and <b>DeployHQ</b><br/>- Administration of test and production environments based on <b>Windows Server</b>",new DateOnly(2021, 9, 1), new DateOnly(2025, 6, 30)
                ),
                new WorkExperience(
                    "Unity Programmer",
                    "Apteka Janicki Gallery",
                    "- Creating <b>2D games</b> in the Unity graphics engine designed for <b>touchscreen monitors</b><br/>- More details:<br/><a href='https://web.archive.org/web/20210126050110/https:/wawel.krakow.pl/centrum-multimedialne' target='_blank'>https://web.archive.org/web/20210126050110/https:/wawel.krakow.pl/centrum-multimedialne</a>",
                    new DateOnly(2019, 2, 1),
                    new DateOnly(2019, 6, 1)
                ),
                new WorkExperience(
                    "IT Internship",
                    "MedApp S.A.",
                    "- Developing and modifying a mobile application (intended for tablets) using <b>Windows UWP</b> technology on the .NET platform and <b>C#</b> language<br/>- Developing <b>WPF</b> applications",
                    new DateOnly(2018, 7, 1),
                    new DateOnly(2018, 8, 31)
                )
            ];

            return Ok(workExperienceTemplateData);
        }
    }
}
