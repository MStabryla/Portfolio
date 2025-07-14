import { Component } from '@angular/core';
import { ProjectService } from './getproject.service';
import { Project } from './project.component';

@Component({
    selector:"main",
    templateUrl:"../html/projects.component.html",
    styleUrls:[
        "../css/projects.component.css"
    ],
    providers:[ProjectService]
}) 
export class ProjectsComponent {
    constructor( private _prService: ProjectService){
        this._prService.getGithubProjects("MStabryla",result => {
            for(var i=result.length-1;i>=0;i--)
                this.projects.push(this._prService.serializeGithubJsonObject(result[i]));
        })
    }
    public projects: Project[] = [];
}