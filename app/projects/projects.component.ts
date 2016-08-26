import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { Project } from './../models/project';
import {ProjectService} from "../services/projects.service";

@Component({
  moduleId: module.id,
  template: `
            <section class="container">
              <h2 style="line-height: 50px; width: 100%; font-size: 38px; font-family: Times New Roman; color: grey; text-decoration: underline;">
                TANGENT PROJECTS
              </h2>
              <p class="status">{{errorMessage}}</p>
              <div *ngFor="let project of projects">
                <div *ngIf="project" class="row">
                  <h3 class="h2">Project <small class="grey-text">{{project.pk}}</small></h3>
                  <div class="col-sm-11 blue-grey-text" style="clear: both;">
                    Title: <span class="black-text">{{project.title ? project.title : 'Unknown'}}</span><br>
                    Description: <span class="black-text">{{project.description ? project.description : 'Unknown'}}</span><br>
                    Start Date: <span class="black-text">{{project.start_date ? project.start_date : 'Unknown'}}</span><br>
                    End Date: <span class="black-text">{{project.end_date ? project.end_date : 'Unknown'}}</span><br>
                    Billable: <span class="black-text">{{project.is_billable ? project.is_billable : 'Unknown'}}</span><br>
                    Active: <span class="black-text">{{project.is_active ? project.is_active : 'Unknown'}}</span><br>
                  </div>
                  <div class="col-lg-10" *ngFor="let task of project.task_set">
                    <div *ngIf="task" class="light-text">
                      <h6>Tasks</h6>
                      <div class="col-sm-10 col grey-text">
                        Title: {{task.title ? task.title : 'Unknown'}} <br>
                        Due Date: {{task.due_date ? task.due_date : 'Unknown'}}<br>
                        Estimated Hours: {{task.estimated_hours ? task.estimated_hours : 'Unknown'}}
                      </div>
                    </div>
                  </div>
                  
                  <div class="col-lg-5 col-lg-offset-6 pull-left">
                    <button class="btn-primary pull-left" (click)="getProject(project.pk)">View</button>
                    <button class="btn-primary pull-left" (click)="renderEdit(project.pk)">Edit</button>
                    <button class="button alert tiny pull-right" (click)="deleteProject(project.pk)">Delete</button>
                  </div>
                </div>
              </div><hr/>
              
              <div class="col-xs-8 col-sm-offset-1">
                <button class="btn-primary pull-left" (click)="renderNew()">New Project</button>
              </div>
            </section>
  `
})

export class ProjectsComponent implements OnInit {
  errorMessage: string;
  projects: Project[];

  constructor(private router: Router, private projectService: ProjectService) {
  }

  renderNew() {
    this.router.navigate(['/newProject']);
  }

  renderShow(id: number) {
    this.router.navigate(['/projects/' + id]);
  }

  renderEdit(id: number) {
    this.router.navigate(['/editProject/' + id]);
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe(
        projects => this.projects = projects,
        error => this.errorMessage = <any>error,
        () => alert("DONE"))
  }

  ngOnInit() {
    this.getPromiseProjects();
    if(!this.projects) {
      this.loadDefaultProjects();
    }
  }

  loadDefaultProjects() {
    this.projects = this.projectService.getTestProjects();
  }

  getPromiseProjects() {
    this.projectService.getPromise().then(result => this.projects = result);
  }


  getProject(id: number) {
    this.projectService.getProject(id).subscribe(
      data => {  this.router.navigate(['/projects/' + id]) },
      error => { this.errorMessage = <any>error },
      () => {  }
    );
  }

  deleteProject(id: number) {
    console.log("Delete Project");

    this.projectService.removeProject(id).subscribe(
      data => {
        console.log(data);
        this.errorMessage = "Successfully destroyed"
      },
      error => { this.errorMessage = <any>error },
      () => { console.log("DONE"); }
    );
  }

}
