

using System.Runtime.InteropServices;

namespace Portfolio.Models;

public class GithubRepo
{
    private string _id;
    private string _name;
    private string _url;
    private string _img_url;
    private DateTime _updated_at;
    private bool _visible;
    private string[] _tags;
    private string _default_branch;
    private string _readme = "";
    private bool _starred;

    public GithubRepo(string id, string name, string html_url, string default_branch, string updated_at, string visibility, string[] topics, int stargazers_count)
    {
        _id = id;
        _name = name;
        _url = html_url;
        _default_branch = default_branch;
        _img_url = html_url + $"/blob/{default_branch}/main.png?raw=true";
        _updated_at = DateTime.Parse(updated_at);
        _visible = visibility == "public";
        _tags = topics;
        _starred = stargazers_count > 0;
    }


    public string Id { get { return _id; } }
    public string Name { get { return _name; } }
    public string Url { get { return _url; } }
    public string ImgUrl { get { return _img_url; } }
    public DateTime UpdatedAt { get { return _updated_at; } }
    public bool Visible { get { return _visible; } }
    public string[] Tags { get { return _tags; } }
    public string DefaultBranch { get { return _default_branch; } }
    public string Readme { get { return _readme; } }
    public bool Starred { get { return _starred; } }

    public void SetReadme(string readme)
    {
        _readme = readme;
    }
}
