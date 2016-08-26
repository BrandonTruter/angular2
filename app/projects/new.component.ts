import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { Project } from './../models/project';
import { ProjectService } from "../services/projects.service";

@Component({
  moduleId: module.id,
  template: `
      <div class="row">
          <div class="col-sm-12">
              <h1>New project</h1>
              <form #projectForm="ngForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label for="title" class="col-sm-2 control-label">Title</label>
                    <div class="col-sm-10">
                        <input [(ngModel)]="newProject.title"  [ngModelOptions]="{standalone: true}" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="description" class="col-sm-2 control-label">Description</label>
                    <div class="col-sm-10">
                        <input [(ngModel)]="newProject.description" [ngModelOptions]="{standalone: true}" />
                    </div>
                </div>
                <div class="form-group">
                  <h4>Dates</h4>
                  <div class="col-sm-5 pull-left">
                    <label for="start_date" class="col-sm-2 control-label">Start date</label>
                    <input [(ngModel)]="newProject.start_date" [ngModelOptions]="{standalone: true}" />
                  </div>
                  <div class="col-sm-5 pull-right">
                    <label for="end_date" class="col-sm-2 control-label">End date</label>
                    <input [(ngModel)]="newProject.end_date" [ngModelOptions]="{standalone: true}" />
                  </div>
                </div>
                <div class="form-group">
                  <h4>Expressions</h4>
                  <div class="col-sm-5 pull-left">
                    <input [(ngModel)]="newProject.is_billable" [ngModelOptions]="{standalone: true}" />
                    <label for="is_billable" class="col-sm-2 control-label">Billable</label>
                  </div>
                  <div class="col-sm-5 pull-right">
                    <input [(ngModel)]="newProject.is_active" [ngModelOptions]="{standalone: true}" />
                    <label for="is_active" class="col-sm-2 control-label">Active</label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-primary">Save</button>
                  </div>
                </div>
            </form>
          </div>
      </div>
  `
})

export class NewProjectComponent implements OnInit  {
  newProject: Project;

  constructor(private router: Router, private projectService: ProjectService) { }

  onSubmit(e: any) {

    this.projectService.saveProject(this.newProject).subscribe(
      data => { console.log("Saved Successfully"); },
      error => { console.error('error' + error[0]) },
      () => { this.router.navigate(['/projects']); }
    )
  }

  ngOnInit() {
    this.newProject = <Project>{
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      is_billable: true,
      is_active: true
    };
  }

}
