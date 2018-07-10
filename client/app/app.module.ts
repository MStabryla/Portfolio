import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProjectComponent } from './project.component';
import { AboutComponent } from './about.component';
import { ExperienceComponent } from './experience.component';
import { ContactComponent } from './contact.component';
import { AdminComponent } from './admin.component';
import { ProjectsComponent } from './projects.component';
import { MenuComponent } from './menu.component';
import { MainComponent } from './main.component';
import { TechComponent } from './tech.component';

import { RouterModule,Routes } from '@angular/router';
import { FootComponent } from './foot.component';

const _routing: Routes = [
  {
      path: "", component: MainComponent
  },
  {
      path: "about", component: AboutComponent
  },
  {
      path: "projects", component: ProjectsComponent
  },
  {
      path: "experience", component: ExperienceComponent
  },
  {
      path: "contact", component: ContactComponent
  },
  {
      path: "admin", component: AdminComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    AboutComponent,
    ExperienceComponent,
    ContactComponent,
    AdminComponent,
    ProjectsComponent,
    MenuComponent,
    MainComponent,
    FootComponent,
    TechComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(_routing)
  ],
  providers: [],
  bootstrap: [AppComponent,MenuComponent,FootComponent]
})
export class AppModule { }
