import { Component } from '@angular/core';
import { ProjectService } from './getproject.service';
import { Project } from './project.component';
import { ScrollService } from './scroll.service';
import { Technology } from './tech.component';

@Component({
    selector:"main-elem",
    templateUrl:"../html/main.component.html",
    styleUrls:[
        "../css/main.component.css"
    ],
    providers:[ProjectService,ScrollService]
})
export class MainComponent {
    constructor( private _pr: ProjectService,private _sc: ScrollService) {
        this.getProjects();
    }
    public Projs: Project[] = [];
    public Technologies: Technology[] = [
        new Technology("WEB","HTML 5, CSS 3, JavaScript, JQuery","../img/tech-web.png","web"),
        new Technology("DESKTOP","C# WPF, C# WebForms, C# UWP","../img/tech-desk.png","desk"),
        new Technology("JS Frameworks","Node.js, Angular.js, Angular 2 , Three.js","../img/tech-js.png","js"),
        new Technology("ASP.NET","MVC , Web API","../img/tech-dotnet.png","asp")
    ];
    public MainIns: string = "Mateusz Stabryła";
    public Desc: string = "Full Stack .NET Developer";
    scroll(): void {
        this._sc.scrollTo(window.innerHeight);
    }
    getProjects(): void {
        this._pr.getGithubProjects("MStabryla",result => {
            console.log(result);
            for(var i=0;i<3;i++)
            {
                let newPr = new Project(result[i].id,result[i].name);
                newPr.language = result[i].language;
                newPr.color = this._pr.LangColors[newPr.language].color;
                newPr.description = result[i].description;
                newPr.url = result[i].html_url;
                this.Projs.push(newPr);
            }
        });
    }
}