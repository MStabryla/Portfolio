import { Component, Input } from '@angular/core';

@Component({
    selector:'project',
    templateUrl:"../html/project.component.html",
    providers:[],
    styleUrls:["../css/project.component.css"]
})
export class ProjectComponent {
    @Input() data: Project = new Project(0,"");
}
export class Project {
    constructor(
        public id: number,
        public name: string
    ) { }
    public description: string;
    public language: string;
    public color: string;
    public url : string;
}