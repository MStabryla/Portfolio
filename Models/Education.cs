using Microsoft.AspNetCore.SignalR;

namespace Portfolio.Models;

public class Education
{
    private string _educationTitle;
    private string _school;
    private string _educationDesc;
    private DateOnly _startDate;
    private DateOnly _endDate;
    private string _photo;
    private Uri _schoolLink;

    public Education(string eTitle,string sName,string eDesc,DateOnly sDate,DateOnly eDate, string photo = "", Uri? schoolLink = default )
    {
        this._educationTitle = eTitle;
        this._school = sName;
        this._educationDesc = eDesc;
        this._startDate = sDate;
        this._endDate = eDate;
        this._photo = photo;
        this._schoolLink = schoolLink ?? new Uri("https://not-found.com/");
    }

    public string EducationTitle { get { return _educationTitle; } }
    public string School { get { return _school; } }
    public string EducationDesc { get { return _educationDesc; } }
    public DateOnly StartDate { get { return _startDate; } }
    public DateOnly EndDate { get { return _endDate; } }
    public string Photo { get { return _photo; } }

    public string? SchoolLink { get { return _schoolLink.AbsoluteUri != "" ? _schoolLink.AbsoluteUri : null; } }

}
