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
                    await (
                        await _httpClient.GetAsync($"https://raw.githubusercontent.com/MStabryla/{x.Name}/{x.DefaultBranch}/README.md"))
                        .Content.ReadAsStringAsync()
                    );
                    return x;
                })
                .Select(t => t.Result)
                .OrderBy(x => x.UpdatedAt)
                .Reverse()
            ];
            return Ok(repos ?? []);
        }
    }
}

