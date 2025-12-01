using Microsoft.AspNetCore.SignalR;

namespace Portfolio.Models;

public class WorkExperience
{
    private string _experienceName;
    private string _companyName;
    private string _experienceDesc;
    private DateOnly _startDate;
    private DateOnly _endDate;

    public WorkExperience(string eName,string cName,string eDesc,DateOnly sDate,DateOnly eDate)
    {
        this._experienceName = eName;
        this._companyName = cName;
        this._experienceDesc = eDesc;
        this._startDate = sDate;
        this._endDate = eDate;
    }

    public string ExperienceName { get { return _experienceName; } }
    public string CompanyName { get { return _companyName; } }
    public string ExperienceDesc { get { return _experienceDesc; } }
    public DateOnly StartDate { get { return _startDate; } }
    public DateOnly EndDate { get { return _endDate; } }

}
