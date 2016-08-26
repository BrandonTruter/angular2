import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { Project } from './../models/project';
import { ProjectService } from "../services/projects.service";

@Component({
  moduleId: module.id,
  template: `
      <div class="container">
      
        <div class="error" *ngIf="errorMessage">
          <div class="error-message">{{errorMessage}}</div>
        </div>
      
        <div class="row">
          <div class="col-md-12">
            <h3>PROJECTS</h3>
            <div class="table-responsive">
              <table class="table table-condensed">
                <thead>
                  <tr>
                    <th class="card-title">Title</th>
                    <th class="card-title">Description</th>
                    <th class="card-title">Starting Date</th>
                    <th class="card-title">Ending Date</th>
                    <th class="card-title">Billable</th>
                    <th class="card-title">Active</th>
                    <th class="card-action">Actions</th>
                  </tr>
                </thead>
                <tbody *ngFor="let project of projects">
                <tr *ngIf="project">
                  <td>{{project.title ? project.title : 'None'}}</td>
                  <td>{{project.description ? project.description : 'None'}}</td>
                  <td>{{project.start_date ? project.start_date : 'None'}}</td>
                  <td>{{project.end_date ? project.end_date : 'None'}}</td>
                  <td>{{project.is_active ? project.is_active : 'None'}}</td>
                  <td>{{project.is_billable ? project.is_billable : 'None'}}</td>
                  <td>
                    <button type="button" class="btn-primary" (click)="renderEdit(project.pk)">Edit</button>
                    <button type="button" class="btn-primary" (click)="deleteProject(project.pk)">Delete</button>
                    <button type="button" class="btn-primary" (click)="isCollapsed = !isCollapsed">Tasks</button>
                    <br/>
      
                    <div class="card card-block card-header">
                      <div class="well well-lg">
                        <div *ngIf="task" class="row light-text">
                          <div class="col-xs-6 col-md-4 grey-text">Title: {{task.title ? task.title : 'Unknown'}}</div>
                          <div class="col-xs-6 col-md-4>Due Date: {{task.due_date ? task.due_date : 'Unknown'}}</div>
                          <div class="col-xs-6 col-md-4>Estimated Hours: {{task.estimated_hours ? task.estimated_hours : 'Unknown'}}</div>
                        </div>
                      </div>
                    </div>
      
                  </td>
                </tr>
                <tfoot>
                <tr>
                  <td colspan="7">
                    <button class="btn-primary pull-left" (click)="renderNew()">New Project</button>
                  </td>
                </tr>
                </tfoot>
              </table>
      
            </div>
          </div>
        </div>
      
      </div>

  `
})

export class ProjectsIndexComponent implements OnInit {
  errorMessage: string;
  projects: Project[];

  public isCollapsed:boolean = false;

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
