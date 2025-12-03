using Microsoft.AspNetCore.SignalR;

namespace Portfolio.Models;

public class AdditionalExperience
{
    private string _experienceName;
    private string _organizationName;
    private string _experienceDesc;
    private DateOnly _startDate;
    private DateOnly _endDate;
    private string _photo;

    public AdditionalExperience(string eName,string oName,string eDesc,DateOnly sDate,DateOnly eDate, string photo = "")
    {
        this._experienceName = eName;
        this._organizationName = oName;
        this._experienceDesc = eDesc;
        this._startDate = sDate;
        this._endDate = eDate;
        this._photo = photo;
    }

    public string ExperienceName { get { return _experienceName; } }
    public string OrganizationName { get { return _organizationName; } }
    public string ExperienceDesc { get { return _experienceDesc; } }
    public DateOnly StartDate { get { return _startDate; } }
    public DateOnly EndDate { get { return _endDate; } }
    public string Photo { get { return _photo; } }

}
