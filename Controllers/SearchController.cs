using System.Net.Mail;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Portfolio.Models;

namespace Portfolio
{
    [Route("search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private HttpClient _httpClient;
        private string _github_token;

        

        public SearchController()
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
        [Route("")]
        public async Task<IActionResult> GetSearchResult(string search_tag)
        {
            if(!HardcodedData.TagMap.ContainsKey(search_tag))
            {
                return BadRequest("Error: Tag not found");
            }
            string[] tagMap = HardcodedData.TagMap[search_tag];

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
                .Where(x => tagMap.Any(tag => x.Readme.Contains($"{tag}")))
            ];
            List<SearchRecord> searchRecords = [.. repos.Select(x => (SearchRecord)x)];
            searchRecords.AddRange(HardcodedData.GetWorkExperiencePl().Where(x => tagMap.Any(tag => x.ExperienceDesc.Contains($"{tag}"))).Select(x => (SearchRecord)x));
            searchRecords.AddRange(HardcodedData.GetEducationPl().Where(x => tagMap.Any(tag => x.EducationDesc.Contains($"{tag}"))).Select(x => (SearchRecord)x));
            searchRecords.AddRange(HardcodedData.GetAdditionalExperiencePl().Where(x => tagMap.Any(tag => x.ExperienceDesc.Contains($"{tag}"))).Select(x => (SearchRecord)x));
            foreach (var record in searchRecords)
            {
                record.ImportantDescription = FetchImportantDescription(tagMap, record);
            }
            searchRecords = [.. searchRecords.OrderByDescending(x => x.Date)];
            return Ok(searchRecords ?? []);
        }

        [HttpGet]
        [Route("en")]
        public async Task<IActionResult> GetSearchResultEn(string search_tag)
        {
            if(!HardcodedData.TagMap.ContainsKey(search_tag))
            {
                return BadRequest("Error: Tag not found");
            }
            string[] tagMap = HardcodedData.TagMap[search_tag];

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
                .Where(x => tagMap.Any(tag => x.Readme.Contains($"{tag}")))
            ];
            List<SearchRecord> searchRecords = [.. repos.Select(x => (SearchRecord)x)];
            searchRecords.AddRange(HardcodedData.GetWorkExperienceEn().Where(x => tagMap.Any(tag => x.ExperienceDesc.Contains($"{tag}"))).Select(x => (SearchRecord)x));
            searchRecords.AddRange(HardcodedData.GetEducationEn().Where(x => tagMap.Any(tag => x.EducationDesc.Contains($"{tag}"))).Select(x => (SearchRecord)x));
            searchRecords.AddRange(HardcodedData.GetAdditionalExperienceEn().Where(x => tagMap.Any(tag => x.ExperienceDesc.Contains($"{tag}"))).Select(x => (SearchRecord)x));
            foreach (var record in searchRecords)
            {
                record.ImportantDescription = FetchImportantDescription(tagMap, record);
            }
            searchRecords = [.. searchRecords.OrderByDescending(x => x.Date)];
            return Ok(searchRecords ?? []);
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
            foreach (var tag in HardcodedData.Tags)
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

        private string FetchImportantDescription(string[] tags, SearchRecord record)
        {
            var lines = record.Description.Split(["<br/>","\n",". ","<ul><li>","</li><li>", "</li></ul>"],50, StringSplitOptions.RemoveEmptyEntries);
            List<string> importantLines = [];
            foreach (var line in lines)
            {
                foreach(var tag in tags)
                {
                    if(line.Contains(tag))
                    {
                        importantLines.Add(line);
                    }
                }
            }
            importantLines = [.. importantLines.Distinct()];
            foreach (var tag in tags)
                importantLines = [.. importantLines.Select(x => x.Replace(tag, $"<b class='search_tag'>{tag}</b>"))];
            return string.Join("</br>", importantLines);
        }
    }
}

