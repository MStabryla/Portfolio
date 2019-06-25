import { Component } from '@angular/core';

@Component({
    selector:"my-menu",
    templateUrl:"../html/menu.component.html",
    styleUrls:[
        "../css/menu.component.css"
    ]
})
export class MenuComponent {
    Logo: string = "Mateusz  Stabryła"
    droppedDownMenu: boolean = false;
    openHamMenu(element: HTMLDivElement): void {
        console.log(element);
    }
}