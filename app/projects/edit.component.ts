import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { Project } from './../models/project';
import { ProjectService } from "../services/projects.service";

@Component({
  moduleId: module.id,
  template: `
      <div class="row">
        <div class="col-sm-12">
          <h1>Edit project</h1>
          <form #projectForm="ngForm" (ngSubmit)="onSubmit()">
      
            <div class="form-group">
              <label class="control-label">Title</label>
              <input [(ngModel)]="project.title" [ngModelOptions]="{standalone: true}" #title />
            </div>
      
            <div class="form-group">
              <label class="control-label">Description</label>
              <input [(ngModel)]="project.description" [ngModelOptions]="{standalone: true}" #description />
            </div>
      
            <div class="form-group">
              <label class="control-label">Start date</label>
              <input [(ngModel)]="project.start_date" [ngModelOptions]="{standalone: true}" #start_date />
            </div>
      
            <div class="form-group">
              <label class="control-label">End date</label>
              <input type="date" [(ngModel)]="project.end_date" [ngModelOptions]="{standalone: true}" #end_date />
            </div>
      
            <div class="form-group">
              <input [(ngModel)]="project.is_billable" [ngModelOptions]="{standalone: true}" #is_billable />
              <label class="col-sm-2 control-label">Billable</label>
            </div>
      
            <div class="form-group">
              <input [(ngModel)]="project.is_active" [ngModelOptions]="{standalone: true}" #is_active />
              <label class="col-sm-2 control-label">Active</label>
            </div>
      
            <div class="form-group">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" class="btn btn-primary" (click)="update(pk, title, description, start_date, end_date, is_billable, is_active)">Update</button>
            </div>
          </form>
        </div>
      </div>
  `
})


export class EditProjectComponent implements OnInit  {
  public project: Project;
  public projectID: number;
  constructor( private router: Router, private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit()  {
    this.projectID = this.route.params['id'];
    this.loadProject(this.projectID);
  }

  private loadProject(id: number) {
    this.projectService.getProject(id)
      .subscribe(
        data => { this.project = <Project>data; },
        error => console.error('Error: ' + error),
        () => { console.log('LOADED') }
      );
  }

  update(pk: number, title: string, description: string, start_date: string, end_date: string, is_billable: boolean, is_active: boolean) {
    this.projectService.updateDetails(pk, title, description, start_date, end_date, is_billable, is_active);
  }

  cancel() {

  }

  clear() {
    // this.
  }

  onSubmit(e: any) {
    this.projectService.updateProject(this.projectID, this.project).subscribe(
      data => { alert(data); },
      error => { alert('error' + error[0]) },
      () => { alert("DONE"); }
    )
  }

}
