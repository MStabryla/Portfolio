import { Component, trigger, transition, style, animate, state, HostListener } from '@angular/core';
let aDuration = 500;
let expandedTransform = "translateY(calc(100% - 2px))"
@Component({
    selector:"my-menu",
    templateUrl:"../html/menu.component.html",
    styleUrls:[
        "../css/menu.component.css"
    ],
    animations:[
        trigger('menuAnim',[
            state("normal",style({transform:"translate(0%)",opacity:1})),
            state("expanded",style({transform: expandedTransform, opacity:1})),
            transition("expanded => collapsed",[
                animate(500,style({opacity:0,transform: "translateY(0%)"}))
            ]),
            transition("collapsed => expanded",[
                animate(500,style({opacity:1,transform: expandedTransform}))
            ]),
            transition("* => normal",style({}))
        ])
    ]
})
export class MenuComponent {
    Logo: string = "Mateusz  Stabryła"
    droppedDownMenu: boolean = false;
    links: Array<string> = ["experience","projects"];
    stateExpression:string = "collapsed";
    @HostListener('window:resize', ['$event'])
    onResize(event){
        let menu = document.getElementById("menu");
        if(window.innerWidth >= 990){
            this.stateExpression = "normal";
        }
        else{
            this.stateExpression = this.droppedDownMenu ? "expanded" : "collapsed";
        }
    }
    openHamMenu(element: HTMLDivElement): void {
        let menu = document.getElementById("menu");
        this.droppedDownMenu = !this.droppedDownMenu;
        //menu.style.display = this.droppedDownMenu ? "block" : "none";
        this.stateExpression = this.droppedDownMenu ? "expanded" : "collapsed";
        
    };
}