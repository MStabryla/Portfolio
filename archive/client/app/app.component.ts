import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ProjectService } from './getproject.service';
import { Project } from './project.component';

@Component({
  selector: 'main-elem',
  templateUrl: '../html/app.component.html',
  styleUrls: ['../css/app.component.css'],
  providers:[ ProjectService ]
})
export class AppComponent {
  title = 'app works!';
  constructor(private _http: ProjectService){
    this._http.getGithubProjects("MStabryla",list => {
      for(let i=0;i<list.length;i++){
        this.Projects[i] = new Project(list[i].id,list[i].name);
        this.Projects[i].language = list[i].language;
        this.Projects[i].color = _http.LangColors[this.Projects[i].language].color;
      }
    })
  }
  Projects: Project[] = [];
}
