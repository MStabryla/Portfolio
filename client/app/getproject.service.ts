import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Project } from './project.component';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService{
    constructor(private _http: Http) {
        
        /*.*/
    }
    getProject(id:number,callback: Function): void {
        this._http.get("/api/project?id=" + id).subscribe(result => {
            let obj = result.json();
            let ob = new Project(obj.ID,obj.Title);
            if(callback instanceof Function)
                callback(ob);
        })
    }
    getProjects(callback: Function) : void {
        this._http.get("/api/projects").subscribe(result => {
            let list = result.json().Projects;
            if(callback)
                callback(list);
        })
    }
    getGithubProjects(username:string,callback: Function): void {
        this._http.get("/api/colors").subscribe( result => {
            let res = result.json();
            this.LangColors = result.json();
            this._http.get("https://api.github.com/users/" + username+"/repos").subscribe(result => {
                if(callback)
                    callback(result.json());
            })
        });
    }
    serializeGithubJsonObject(jsonResult: any): Project{
        let newPr = new Project(jsonResult.id,jsonResult.name);
        newPr.language = jsonResult.language;
        newPr.color = this.LangColors[newPr.language].color;
        newPr.description = jsonResult.description;
        newPr.url = jsonResult.html_url;
        return newPr;
    }
    LangColors: any;
}