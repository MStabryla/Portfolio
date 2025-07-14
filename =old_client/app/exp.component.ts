import { Component,Input } from '@angular/core';

@Component({
    selector:'exp',
    templateUrl:"../html/exp.component.html",
    styleUrls:[
        "../css/exp.component.css"
    ]
})
export class ExpComponent
{
    @Input() public data: Exp;
}
export class Exp
{
    constructor(
        public company: string,
        public dateFrom: Date,
        public dateTo: Date,
        public standing: string,
        public desc: string,
        public logoUrl: string) { }
}