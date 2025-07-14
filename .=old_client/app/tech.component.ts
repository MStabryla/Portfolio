import { Component,Input } from '@angular/core';

@Component({
    selector:'tech',
    templateUrl:"../html/tech.component.html",
    styleUrls: [
        "../css/tech.component.css"
    ]
}) 
export class TechComponent {
    @Input() data: Technology;
}
export class Technology {
    constructor(
        public Name: string,
        public Desc: string,
        public ImgUrl: string,
        public Tag: string )
        { }
}