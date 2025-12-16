

using System.Runtime.InteropServices;

namespace Portfolio.Models;

public struct GithubTag
{
    static readonly Dictionary<string, string> tagMap = new Dictionary<string, string>{

        { "dotnet", ".NET" },
        { "angular2","Angular" },
        { "asp-net-core","ASP.NET" },
        { "asp-net-core-mvc","ASP.NET" },
        { "dotnet-core",".NET Core" },
        { "sql","SQL" },
        { "javascript","JavaScript" },
        { "entity-framework","Entity Framework" },
        { "csharp",".NET" },
        { "rest-api","REST API" }
    };
    public GithubTag(string name)
    {
        Name = name;
        if(tagMap.ContainsKey(name)) 
            Tag = tagMap[name];
        else
            Tag = name;
    }
    public string Name {get;set;}
    public string Tag {get;set;}
}
public class GithubRepo
{
    private string _id;
    private string _name;
    private string _url;
    private string _img_url;
    private DateTime _created_at;
    private DateTime _updated_at;
    private bool _visible;
    private GithubTag[] _tags;
    private string _default_branch;
    private string _readme = "";
    private bool _starred;

    public GithubRepo(string id, string name, string html_url, string default_branch, string created_at, string updated_at, string visibility, string[] topics, int stargazers_count)
    {
        _id = id;
        _name = name;
        _url = html_url;
        _default_branch = default_branch;
        _img_url = html_url + $"/blob/{default_branch}/main.png?raw=true";
        _created_at = DateTime.Parse(created_at);
        _updated_at = DateTime.Parse(updated_at);
        _visible = visibility == "public";
        _tags = [.. topics.Select(x => { return new GithubTag(x); })];
        _starred = stargazers_count > 0;
    }


    public string Id { get { return _id; } }
    public string Name { get { return _name; } }
    public string Url { get { return _url; } }
    public string ImgUrl { get { return _img_url; } }
    public DateTime CreatedAt { get { return _created_at; } }
    public DateTime UpdatedAt { get { return _updated_at; } }
    public bool Visible { get { return _visible; } }
    public GithubTag[] Tags { get { return _tags; } }
    public string DefaultBranch { get { return _default_branch; } }
    public string Readme { get { return _readme; } }
    public bool Starred { get { return _starred; } }

    public void SetReadme(string readme)
    {
        _readme = readme;
    }
}
