import { Component, Input } from '@angular/core';
import { ProjectService } from './getproject.service';

@Component({
    selector:'project',
    templateUrl:"../html/project.component.html",
    providers:[]
})
export class ProjectComponent {
    @Input() data: Project = new Project(0,"");
}
export class Project {
    constructor(
        public id: number,
        public name: string
    ) { }
    
    public language: string;
    public color: string;
}