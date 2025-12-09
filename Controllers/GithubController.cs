using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Portfolio.Models;

namespace Portfolio
{
    [Route("github")]
    [ApiController]
    public class GithubController : ControllerBase
    {
        private HttpClient _httpClient;
        private string _github_token;

        private readonly string[] _tag_map = [
            "C#", "CSharp", "DotNet" ,
            "ASP.NET Core MVC", "ASP.NET Core", "ASP.NET", 
            ".NET Core", ".NET",
            "JavaScript", "TypeScript", "Vue.js", "Node.js", "Next.js",
            "HTML5", "HTML", "CSS",
            "Dockerfile", "Docker",
            "Kubernetes", "K8s",
            "Machine Learning", "ML",
            "Data Science", "Unity",  
            "MongoDB", "NoSQL", "SQLite", "SQL", "GraphQL",
            "REST API", "Entity Framework Core", "Entity Framework",
            "Angular 2", "Angular.js"
        ];

        public GithubController()
        {
            _github_token = Environment.GetEnvironmentVariable("GITHUB_TOKEN") ?? "undefined";
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri("https://api.GitHub.com"), 
                DefaultRequestHeaders =
                {
                    { "Accept", "application/vnd.github+json" },
                    { "X-GitHub-Api-Version", "2022-11-28" },
                    { "User-Agent", "MStabryla" },
                    { "Authorization", $"token {_github_token}" }
                }
            };
        }
        [HttpGet]
        [Route("repos")]
        public async Task<IActionResult> GetRepositories()
        {
            var response = await _httpClient.GetAsync("/users/MStabryla/repos");
            if (!response.IsSuccessStatusCode)
            {
                switch (response.StatusCode)
                {
                    case System.Net.HttpStatusCode.Unauthorized: {
                        return Unauthorized("Error: Unauthorized. Please check your GitHub token.");
                    }
                    case System.Net.HttpStatusCode.Forbidden: {
                        return Forbid("Error: Forbidden. You might have exceeded the API rate limit.");
                    }
                    case System.Net.HttpStatusCode.NotFound: {
                        return NotFound("Error: Forbidden. You might have exceeded the API rate limit.");
                    }
                    default:
                    {
                        throw new Exception("Error: An unexpected error occurred while fetching repositories.");
                    }
                }
            }

            GithubRepo[] repos = JsonConvert.DeserializeObject<GithubRepo[]>(await response.Content.ReadAsStringAsync()) ?? [];
            repos = [.. 
                repos.Where(x => x.Visible && x.Starred)
                .Select (async x => {
                    x.SetReadme(
                        await FetchReadme(x.Name,x.DefaultBranch)
                    );
                    return x;
                })
                .Select(t => t.Result)
                .OrderBy(x => x.CreatedAt)
                .Reverse()
            ];
            return Ok(repos ?? []);
        }
        [HttpGet]
        [Route("repos/en")]
        public async Task<IActionResult> GetRepositoriesEn()
        {
            var response = await _httpClient.GetAsync("/users/MStabryla/repos");
            if (!response.IsSuccessStatusCode)
            {
                switch (response.StatusCode)
                {
                    case System.Net.HttpStatusCode.Unauthorized: {
                        return Unauthorized("Error: Unauthorized. Please check your GitHub token.");
                    }
                    case System.Net.HttpStatusCode.Forbidden: {
                        return Forbid("Error: Forbidden. You might have exceeded the API rate limit.");
                    }
                    case System.Net.HttpStatusCode.NotFound: {
                        return NotFound("Error: Forbidden. You might have exceeded the API rate limit.");
                    }
                    default:
                    {
                        throw new Exception("Error: An unexpected error occurred while fetching repositories.");
                    }
                }
            }

            GithubRepo[] repos = JsonConvert.DeserializeObject<GithubRepo[]>(await response.Content.ReadAsStringAsync()) ?? [];
            repos = [.. 
                repos.Where(x => x.Visible && x.Starred)
                .Select (async x => {
                    x.SetReadme(
                        await FetchReadme(x.Name,x.DefaultBranch,"en")
                    );
                    return x;
                })
                .Select(t => t.Result)
                .OrderBy(x => x.CreatedAt)
                .Reverse()
            ];
            return Ok(repos ?? []);
        }

        private async Task<string> FetchReadme(string repoName, string defaultBranch,string lang = "pl")
        {
            var response = await _httpClient.GetAsync($"https://raw.githubusercontent.com/MStabryla/{repoName}/{defaultBranch}/README.md");
            if (!response.IsSuccessStatusCode)
            {
                return "";
                
            }
            string text = await response.Content.ReadAsStringAsync();
            text = Regex.Replace(text, @"!\[main image\][\w\S]*\n", "");
            text = Regex.Replace(text, @":x:", "❌");
            text = Regex.Replace(text, @":x:", "❌");
            text = Regex.Replace(text, @":white_check_mark:", "✅");
            text = Regex.Replace(text, @"# EN - ", "[en] #");
            text = Regex.Replace(text, @"\n\n+", "<br/>");
            text = Regex.Replace(text, @"\*\*", "");
            foreach (var tag in _tag_map)
            {
                text = Regex.Replace(text, $@" ({tag})", $" <b>$1</b>");
            }
            var parts = text.Split("[en] ");
            string readmePL = parts[0].Replace("# PL - ", "# ");
            string readmeEN = parts.Length > 1 ? parts[1].Trim() : readmePL;
            readmePL = Regex.Replace(readmePL, @"#+ ?([\w ]+)", "<b class='big-b'>$1</b>\n");
            readmeEN = Regex.Replace(readmeEN, @"#+ ?([\w ]+)", "<b class='big-b'>$1</b>\n");
            return lang == "pl" ? readmePL : readmeEN;
        }
    }
}

