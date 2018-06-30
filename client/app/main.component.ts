import { Component } from '@angular/core';

@Component({
    selector:"main-elem",
    templateUrl:"../html/main.component.html",
    styleUrls:[
        "../css/main.component.css"
    ]
})
export class MainComponent {
    public MainIns: string = "Mateusz Stabryła";
    public Desc: string = "Full Stack .NET Developer";
    scroll(): void {
        window.scrollBy({
            left: 0,
            top: window.innerHeight,
            behavior: 'smooth'
        })
    }
}