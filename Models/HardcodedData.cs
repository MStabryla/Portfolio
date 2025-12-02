namespace Portfolio.Models;

public static class HardcodedData
{
    public static WorkExperience[] GetWorkExperienceEn()
    {
        return 
        [
            new WorkExperience(
                "Junior SysOps / .NET Programmer", "Webedia Polska S.A.", "- Developing and maintaining the gry-online.pl website and subpages written in <b>.NET</b> technologies (<b>ASP</b>, <b>Visual Basic</b>)<br/>- Developing web applications using <b>JavaScript</b> and the <b>Vue.js</b> platform for internal and editorial use<br/>- Creating and implementing a tool using <b>C#</b>, <b>Windows Forms</b> and <b>ASP.NET Core</b> with access to the <b>REST API</b> to communicate with external clients<br/>- Creating complex <b>SQL</b> queries within few applications. Managing and maintaining an <b>MS SQL</b> database<br/>- Implementation of SysOps and DevOps tools such as <b>PRTG</b>, <b>Bitbucket</b>, <b>Git</b>, and <b>DeployHQ</b><br/>- Administration of test and production environments based on <b>Windows Server</b>",new DateOnly(2021, 9, 1), new DateOnly(2025, 6, 30)
            ),
            new WorkExperience(
                "Unity Programmer",
                "Apteka Janicki Gallery",
                "- Creating <b>2D games</b> in the Unity graphics engine designed for <b>touchscreen monitors</b><br/>- More details:<br/><a href='https://web.archive.org/web/20210126050110/https:/wawel.krakow.pl/centrum-multimedialne' target='_blank'>https://web.archive.org/web/20210126050110/https:/wawel.krakow.pl/centrum-multimedialne</a>",
                new DateOnly(2019, 2, 1),
                new DateOnly(2019, 6, 1)
            ),
            new WorkExperience(
                "IT Internship",
                "MedApp S.A.",
                "- Developing and modifying a mobile application (intended for tablets) using <b>Windows UWP</b> technology on the .NET platform and <b>C#</b> language<br/>- Developing <b>WPF</b> applications",
                new DateOnly(2018, 7, 1),
                new DateOnly(2018, 8, 31)
            )
        ];
    }

    public static WorkExperience[] GetWorkExperiencePl()
    {
        return 
        [
            new WorkExperience(
                "Junior SysOps / Programista .NET", "Webedia Polska S.A.", "- Implementacja narzędzi SysOps oraz DevOps, takich jak <b>PRTG</b>, <b>Bitbucket</b>, <b>Git</b> i <b>DeployHQ</b>.<br/>- Administracja środowiskiem testowym i produkcyjnym opartymna systemie z rodziny <b>Windows Server</b>.<br/>- Tworzenie złożonych zapytań <b>SQL</b> wykorzystywanych przezaplikacje. Zarządzanie i utrzymanie bazy <b>MS SQL</b>.<br/>- Rozwijanie i utrzymywanie strony internetowej gry-online.pl oraz podstron napisanych w technologiach <b>.NET</b> (<b>ASP</b>, <b>Visual Basic</b>)<br/>- Rozwijanie aplikacji webowych z użyciem <b>JavaScript</b> i platformy <b>Vue.js</b> na potrzeby redakcyjne<br/>- Tworzenie i implementacja narzędzi wewnętrznych zwykorzystaniem <b>C#</b>, <b>Windows Forms</b> i <b>ASP.NET Core</b> w konwencji <b>REST API</b>.",new DateOnly(2021, 9, 1), new DateOnly(2025, 6, 30), "gol.jpg"
            ),
            new WorkExperience(
                "Programista aplikacji Unity",
                "Apteka Janicki Gallery",
                "- Tworzenie <b>gier 2D</b> w silniku graficznym <b>Unity</b> przeznaczonych dla monitorów z interfejsem dotykowym.<br/>- Więcej szczegółów:<br/><a href='https://web.archive.org/web/20210126050110/https:/wawel.krakow.pl/centrum-multimedialne' target='_blank'>https://web.archive.org/web/20210126050110/https:/wawel.krakow.pl/centrum-multimedialne</a>",
                new DateOnly(2019, 2, 1),
                new DateOnly(2019, 6, 1),
                 "wawel.jpg"
            ),
            new WorkExperience(
                "Stażysta wakacyjny",
                "MedApp S.A.",
                "- Rozwijanie aplikacji mobilnej (przeznaczonej na tablety) w technologii Windows <b>UWP</b> na platformie <b>.NET</b> i <b>C#</b>.<br/>- Rozwój aplikacji WPF.",
                new DateOnly(2018, 7, 1),
                new DateOnly(2018, 8, 31),
                "medapp.jpg"
            )
        ];
    }
}
