namespace Portfolio.Models;

public static class HardcodedData
{
    public static WorkExperience[] GetWorkExperienceEn()
    {
        return 
        [
            new WorkExperience(
                "Junior SysOps / .NET Programmer", "Webedia Polska S.A.", "- Developing and maintaining the gry-online.pl website and subpages written in <b>.NET</b> technologies (<b>ASP</b>, <b>Visual Basic</b>)<br/>- Developing web applications using <b>JavaScript</b> and the <b>Vue.js</b> platform for internal and editorial use<br/>- Creating and implementing a tool using <b>C#</b>, <b>Windows Forms</b> and <b>ASP.NET Core</b> with access to the <b>REST API</b> to communicate with external clients<br/>- Creating complex <b>SQL</b> queries within few applications. Managing and maintaining an <b>MS SQL</b> database<br/>- Implementation of SysOps and DevOps tools such as <b>PRTG</b>, <b>Bitbucket</b>, <b>Git</b>, and <b>DeployHQ</b><br/>- Administration of development and production environments based on <b>Windows Server</b>",
                new DateOnly(2021, 9, 1), 
                new DateOnly(2025, 6, 30),
                "gol.jpg",
                new Uri("https://www.gamepressure.com/info/")
            ),
            new WorkExperience(
                "Unity Programmer",
                "Apteka Janicki Gallery",
                "- Creating <b>2D games</b> in the Unity graphics engine designed for <b>touchscreen monitors</b><br/>- More details:<br/><a href='https://web.archive.org/web/20210126050110/https:/wawel.krakow.pl/centrum-multimedialne' target='_blank'>https:/wawel.krakow.pl/centrum-multimedialne</a>",
                new DateOnly(2019, 2, 1),
                new DateOnly(2019, 6, 1),
                "wawel.jpg"
            ),
            new WorkExperience(
                "IT Internship",
                "MedApp S.A.",
                "- Developing and modifying a mobile application (intended for tablets) using <b>Windows UWP</b> technology on the .NET platform and <b>C#</b> language<br/>- Developing <b>WPF</b> applications",
                new DateOnly(2018, 7, 1),
                new DateOnly(2018, 8, 31),
                "medapp.jpg",
                new Uri("https://medapp.pl/en/kluczowa-dzialalnosc/")
            ),
            new WorkExperience(
                "IT Internship",
                "Petroinform.net",
                "- Providing help in managing and installing network connection to clients<br/>- Fiber network welding",
                new DateOnly(2017, 7, 1),
                new DateOnly(2017, 8, 31),
                "petroinform.jpg"
            ),
            new WorkExperience(
                "IT Internship",
                "The Cogworks",
                "- Learning how to use and create pages in the <b>Umbraco CMS</b><br/>- Implementing functionality using <b>C#</b> language",
                new DateOnly(2017, 5, 1),
                new DateOnly(2017, 5, 31),
                "cogworks.jpg",
                new Uri("https://www.wearecogworks.com/")
            )
        ];
    }

    public static WorkExperience[] GetWorkExperiencePl()
    {
        return 
        [
            new WorkExperience(
                "Junior SysOps / Programista .NET", "Webedia Polska S.A.", "- Implementacja narzędzi SysOps oraz DevOps, takich jak <b>PRTG</b>, <b>Bitbucket</b>, <b>Git</b> i <b>DeployHQ</b>.<br/>- Administracja środowiskiem testowym i produkcyjnym opartymna systemie z rodziny <b>Windows Server</b>.<br/>- Tworzenie złożonych zapytań <b>SQL</b> wykorzystywanych przezaplikacje. Zarządzanie i utrzymanie bazy <b>MS SQL</b>.<br/>- Rozwijanie i utrzymywanie strony internetowej gry-online.pl oraz podstron napisanych w technologiach <b>.NET</b> (<b>ASP</b>, <b>Visual Basic</b>)<br/>- Rozwijanie aplikacji webowych z użyciem <b>JavaScript</b> i platformy <b>Vue.js</b> na potrzeby redakcyjne<br/>- Tworzenie i implementacja narzędzi wewnętrznych z wykorzystaniem <b>C#</b>, <b>Windows Forms</b> i <b>ASP.NET Core</b> w konwencji <b>REST API</b>.",
                new DateOnly(2021, 9, 1), 
                new DateOnly(2025, 6, 30), 
                "gol.jpg",
                new Uri("https://firma.gry-online.pl/")
            ),
            new WorkExperience(
                "Programista gier Unity",
                "Apteka Janicki Gallery",
                "- Tworzenie <b>gier 2D</b> w silniku graficznym <b>Unity</b> przeznaczonych dla monitorów z interfejsem dotykowym.<br/>- Więcej szczegółów:<br/><a href='https://web.archive.org/web/20210126050110/https:/wawel.krakow.pl/centrum-multimedialne' target='_blank'>https:/wawel.krakow.pl/centrum-multimedialne</a>",
                new DateOnly(2019, 2, 1),
                new DateOnly(2019, 6, 1),
                "wawel.jpg",
                new Uri("https://aptekagallery.com/")
            ),
            new WorkExperience(
                "Stażysta wakacyjny",
                "MedApp S.A.",
                "- Rozwijanie aplikacji mobilnej (przeznaczonej na tablety) w technologii Windows <b>UWP</b> na platformie <b>.NET</b> i <b>C#</b>.<br/>- Rozwój aplikacji <b>WPF</b>.",
                new DateOnly(2018, 7, 1),
                new DateOnly(2018, 8, 31),
                "medapp.jpg",
                new Uri("https://medapp.pl/kluczowa-dzialalnosc/")
            ),
            new WorkExperience(
                "Praktyka",
                "Petroinform.net",
                "- Pomoc w instalacji sieci internetowej u klientów detalicznych<br/>- Spawanie i naprawianie sieci światłowodowej<br/>- Konfiguracja urządzeń sieciowych takich jak np. router, switch",
                new DateOnly(2017, 7, 1),
                new DateOnly(2017, 8, 31),
                "petroinform.jpg",
                new Uri("https://petroinform.net/o-nas/")
            ),
            new WorkExperience(
                "Praktyka",
                "The Cogworks",
                "- Nauka korzystania i tworzenia stron w systemie <b>CMS Umbraco</b>.<br/>- Implementacja funkcjonalności z użyciem języka <b>C#</b>",
                new DateOnly(2017, 5, 1),
                new DateOnly(2017, 5, 31),
                "cogworks.jpg",
                new Uri("https://www.wearecogworks.com/")
            )
        ];
    }

    public static Education[] GetEducationPl()
    {
        return [
            new Education(
                "Magister Inżynier - Informatyka Stosowana",
                "Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie",
                "- Tytuł uzyskany na Wydziale Inżynierii Metali i Informatyki Przemysłowej WIMIIP<br/>- Projekt inżynierski oraz magisterski polegał na stworzeniu i oprogramowaniu samo jeżdżącego robota na platformie <b>Arduino</b>",
                new DateOnly(2018, 10, 1),
                new DateOnly(2023, 10, 23),
                "agh.jpg"
            ),
            new Education(
                "Technik Informatyk",
                "Zespół Szkół Łączności im. Obrońców Poczty Polskiej w Gdańsku w Krakowie",
                "Tytuł obejmuje umiejętności:<br/>- Korzystania i administrowania systemami operacyjnymi z rodziny <b>Windows</b> oraz <b>Linux (Debian)</b><br/>- Obsługę serwerowych systemów operacyjnych z rodziny <b>Windows Server</b><br/>- Tworzenia stron internetowych w <b>HTML</b>, <b>CSS</b> i <b>JavaScript</b><br/>- Zarządzania bazą <b>MySQL</b> i tworzenia prostych zapytań <b>SQL</b>",
                new DateOnly(2014, 9, 1),
                new DateOnly(2018, 4, 27),
                "zsl.jpg"
            )
        ];
    }
    public static Education[] GetEducationEn()
    {
        return [
            new Education(
                "Master Engineer Degree of Computer Science",
                "AGH University of Science and Technology",
                "- Degree earned at the Faculty of Metals Engineering and Industrial Computer Science, WIMIIP<br/>- The engineering and master's project involved creating and programming a self-driving robot using the <b>Arduino</b> platform.",
                new DateOnly(2018, 10, 1),
                new DateOnly(2023, 10, 23),
                "agh.jpg"
            ),
            new Education(
                "IT technician",
                "ZSŁ Upper Secondary School of Communications in Cracow",
                "This title includes skills like:<br/>- Using and administering <b>Windows</b> and <b>Linux (Debian)</b> operating systems<br/>- Supporting and managing <b>Windows Server</b> operating systems<br/>- Creating websites with <b>HTML</b>, <b>CSS</b> and <b>JavaScript</b><br/>- Managing a <b>MySQL</b> database and creating simple <b>SQL</b> queries",
                new DateOnly(2014, 9, 1),
                new DateOnly(2018, 4, 27),
                "zsl.jpg"
            )
        ];
    }

    public static AdditionalExperience[] GetAdditionalExperiencePl()
    {
        return [
            new AdditionalExperience(
                "Nauczyciel w JUNIOR WSEI.NET",
                "Wyższa Szkoła Ekonomii i Informatyki (WSEI) w Krakowie",
                "- Pomoc w prowadzeniu zajęć z podstaw języka <b>C#</b> na <b>Wyższej Szkole Ekonomii i Informatyki w Krakowie</b><br/>- Zajęcia były przeznaczone dla uczniów szkół średnich, którzy zaczynali swoją przygodę z programowaniem.",
                new DateOnly(2016, 10, 1),
                new DateOnly(2017, 4, 30),
                "junior-wsei.jpg"
            ),
            new AdditionalExperience(
                "Członek Koła Promocji Szkoły",
                "Zespół Szkół Łączności im. Obrońców Poczty Polskiej w Gdańsku w Krakowie",
                "- Promocja kierunków technicznych na targach szkół średnich w Krakowie i okolicach<br/>- Prezentacja szkoły podczas Dni Otwartych<br/>- Rozmowa z potencjalnymi kandydatami i ich rodzicami na temat szkoły i zalet wybrania danego kierunku<br/>- Regularne spotkania przygotowujące członków koła do pracy z ludźmi.",
                new DateOnly(2014, 10, 1),
                new DateOnly(2018, 4, 27),
                "kolo-promocji.jpg"
            )
        ];
    }
    public static AdditionalExperience[] GetAdditionalExperienceEn()
    {
        return [
            new AdditionalExperience(
                "JUNIOR WSEI.NET Teacher",
                "School of Computer Science and Economics of Kraków (WSEI)",
                "- Assistance in conducting classes on the basic C# language at the School of Computer Science and Economics.<br/>- This course was intended for high school students who were just starting their programming career.",
                new DateOnly(2016, 10, 1),
                new DateOnly(2017, 4, 30),
                "junior-wsei.jpg"
            ),
            new AdditionalExperience(
                "Member of the School Promotion Circle",
                "ZSŁ Upper Secondary School of Communications in Cracow",
                "- Promotion of technical programs at high school fairs in Krakow and the surrounding area.<br/>- Presentation of the school during Open House Days.<br/>- Discussions with potential candidates and their parents about the school and the advantages of choosing a given program.<br/>- Regular meetings prepare organisation members for working with people.",
                new DateOnly(2014, 10, 1),
                new DateOnly(2018, 4, 27),
                "kolo-promocji.jpg"
            )
        ];
    }
}
