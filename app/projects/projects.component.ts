import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../services/projects.service";
import { Project }           from './../models/project';

@Component({
  moduleId: module.id,
  template: `
            <section class="container">
              <h2 class="header">PROJECTS</h2>
              <div *ngFor="let project of projects">
                <div *ngIf="project" class="row">
                  <h3 class="h2">Project <small class="grey-text">{{project.pk}}</small></h3>
                  <div class="col-sm-11 blue-grey-text" style="clear: both;">
                    Title: <span class="l1">{{project.title ? project.title : 'Unknown'}}</span><br>
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
                    <button class="btn-primary pull-left" (click)="updateProject(project.pk)">Edit</button>
                    <button class="btn-primary pull-right" (click)="deleteProject(project.pk)">Delete</button>
                  </div>
                </div>
              </div>
              <hr/>
              <div class="col-xs-8 col-sm-offset-1">
                <button class="btn-primary pull-left">New Project</button>
                <button class="btn-primary pull-right">Logout</button>
              </div>
            </section>
  `
})

export class ProjectsComponent implements OnInit {
  errorMessage: string;
  projects: Project[];

  constructor(private projectService: ProjectService) {
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

  getPromiseProjects() {
    this.projectService.getPromise().then(result => this.projects = result);
  }

  loadDefaultProjects() {
    this.projects = this.projectService.getTestProjects();
  }

  addProject() {
    // Add functionality to service
  }

  updateProject(id: number) {
    // Add functionality to service
  }

  deleteProject(id: number) {
    // Add functionality to service
  }

}
