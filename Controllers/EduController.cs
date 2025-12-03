using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Models;

namespace Portfolio
{
    [Route("education")]
    [ApiController]
    public class EduController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public Education[] GetExperienceEn()
        {
            return HardcodedData.GetEducationEn();
        }

        [HttpGet]
        [Route("pl")]
        public Education[] GetExperiencePl()
        {
            return HardcodedData.GetEducationPl();
        }
    }
}
