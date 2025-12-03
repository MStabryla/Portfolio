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

        [HttpGet]
        [Route("additional")]
        public AdditionalExperience[] GetAddExperienceEn()
        {
            return HardcodedData.GetAdditionalExperienceEn();
        }

        [HttpGet]
        [Route("additional/pl")]
        public AdditionalExperience[] GetAddExperiencePl()
        {
            return HardcodedData.GetAdditionalExperiencePl();
        }
    }
}
