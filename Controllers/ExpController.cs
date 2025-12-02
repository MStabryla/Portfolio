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
        public WorkExperience[] GetExperienceEn()
        {
            return HardcodedData.GetWorkExperienceEn();
        }

        [HttpGet]
        [Route("work/pl")]
        public WorkExperience[] GetExperiencePl()
        {
            return HardcodedData.GetWorkExperiencePl();
        }
    }
}
