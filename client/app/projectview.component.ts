import { Component, Input } from '@angular/core'
import { Project } from './project.component';

@Component({
    selector:'projectview',
    templateUrl:'../html/projectview.component.html',
    styleUrls:[
        '../css/projectview.component.css'
    ]
})

export class ProjectviewComponent {
    @Input() projectData: Project = new Project(0,""); 
}