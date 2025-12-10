using System.Text.RegularExpressions;

namespace Portfolio.Models;

public class SearchRecord
{
    public string Name { get; set; }
    public string Type { get; set; }
    public string Description { get; set; }
    public string ImportantDescription { get; set; }
    public DateOnly Date { get; set; }
    public SearchRecord()
    {
        Name = "";
        Type = "";
        Description = "";
        ImportantDescription = "";
        Date = new DateOnly();
    }

    public static implicit operator SearchRecord(GithubRepo repo)
    {
        return new SearchRecord()
        {
            Name = repo.Name,
            Type = "Repository",
            Description = repo.Readme,
            Date = DateOnly.FromDateTime(repo.CreatedAt)
        };
    }

    public static implicit operator SearchRecord(WorkExperience experience)
    {
        return new SearchRecord()
        {
            Name = experience.ExperienceName,
            Type = "WorkExperience",
            Description = experience.ExperienceDesc,
            Date = experience.EndDate
        };
    }
    public static implicit operator SearchRecord(Education education)
    {
        return new SearchRecord()
        {
            Name = education.EducationTitle,
            Type = "Education",
            Description = education.EducationDesc,
            Date = education.EndDate
        };
    }

    public static implicit operator SearchRecord(AdditionalExperience experience)
    {
        return new SearchRecord()
        {
            Name = experience.ExperienceName,
            Type = "AddExperience",
            Description = experience.ExperienceName,
            Date = experience.EndDate
        };
    }

}
