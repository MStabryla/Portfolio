import { Component } from '@angular/core';
import { ProjectService } from './getproject.service';
import { Project } from './project.component';
import { ProjectComponent } from './project.component';

@Component({
    selector:"main-elem",
    templateUrl:"../html/main.component.html",
    styleUrls:[
        "../css/main.component.css"
    ],
    providers:[ProjectService,ProjectComponent]
})
export class MainComponent {
    constructor( private _pr: ProjectService) {
        this.getProjects();
    }
    public Projs: Project[] = [];
    public MainIns: string = "Mateusz Stabryła";
    public Desc: string = "Full Stack .NET Developer";
    scroll(): void {
        /*window.scrollBy({
            left: 0,
            top: window.innerHeight,
            behavior: 'smooth'
        })*/
        window.addEventListener("scroll",e => {
            //event.returnValue = false;
            e.returnValue = false
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        })
        let distanse = window.innerHeight,speed = 12;
        let scrollInterval = setInterval(() => {
            window.scrollBy(0,speed);
            if(window.scrollY >= distanse)
            {
                clearInterval(scrollInterval);
                window.onscroll = null;
            }
        },1);
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