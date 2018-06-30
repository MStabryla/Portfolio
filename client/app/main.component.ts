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
        window.addEventListener("scroll",e => {
            e.returnValue = false
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        })
        let destiny = window.innerHeight,speed = 12,distanse = Math.abs(destiny - window.scrollY),distanseCounter = 0;
        console.log("distanse",distanse);
        let scrollInterval = setInterval(() => {
            window.scrollBy(0,speed);
            distanseCounter += speed;
            if(distanseCounter >=  distanse * 0.4 && distanseCounter <= distanse * 0.6)
            {
                speed = 18;
            }
            else if(distanseCounter <  distanse * 0.3 || distanseCounter > distanse * 0.7)
            {
                speed = 12;
            }
            if(distanseCounter <  distanse * 0.2 || distanseCounter > distanse * 0.8)
            {
                speed = 10;
            }
            if(distanseCounter <  distanse * 0.1 || distanseCounter > distanse * 0.9)
            {
                speed = 4;
            }
            if(window.scrollY >= destiny)
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