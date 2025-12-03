using Microsoft.AspNetCore.SignalR;

namespace Portfolio.Models;

public class WorkExperience
{
    private string _experienceName;
    private string _companyName;
    private string _experienceDesc;
    private DateOnly _startDate;
    private DateOnly _endDate;
    private string _photo;
    private Uri _companyLink;

    public WorkExperience(string eName,string cName,string eDesc,DateOnly sDate,DateOnly eDate, string photo = "", Uri? companyLink = default )
    {
        this._experienceName = eName;
        this._companyName = cName;
        this._experienceDesc = eDesc;
        this._startDate = sDate;
        this._endDate = eDate;
        this._photo = photo;
        this._companyLink = companyLink ?? new Uri("https://not-found.com/");
    }

    public string ExperienceName { get { return _experienceName; } }
    public string CompanyName { get { return _companyName; } }
    public string ExperienceDesc { get { return _experienceDesc; } }
    public DateOnly StartDate { get { return _startDate; } }
    public DateOnly EndDate { get { return _endDate; } }
    public string Photo { get { return _photo; } }

    public string? CompanyLink { get { return _companyLink.AbsoluteUri != "" ? _companyLink.AbsoluteUri : null; } }

}
