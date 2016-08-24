/**
 * Created by brandon on 2016/08/23.
 */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
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
                        <input [(ngModel)]="project.title" [ngModelOptions]="{standalone: true}" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="description" class="col-sm-2 control-label">Description</label>
                    <div class="col-sm-10">
                        <input [(ngModel)]="project.description" [ngModelOptions]="{standalone: true}" />
                    </div>
                </div>
                <div class="form-group">
                  <h4>Dates</h4>
                  <div class="col-sm-5 pull-left">
                    <label for="start_date" class="col-sm-2 control-label">Start date</label>
                    <input [(ngModel)]="project.start_date" [ngModelOptions]="{standalone: true}" />
                  </div>
                  <div class="col-sm-5 pull-right">
                    <label for="end_date" class="col-sm-2 control-label">End date</label>
                    <input [(ngModel)]="project.end_date" [ngModelOptions]="{standalone: true}" />
                  </div>
                </div>
                <div class="form-group">
                  <h4>Expressions</h4>
                  <div class="col-sm-5 pull-left">
                    <input [(ngModel)]="project.is_billable" [ngModelOptions]="{standalone: true}" />
                    <label for="is_billable" class="col-sm-2 control-label">Billable</label>
                  </div>
                  <div class="col-sm-5 pull-right">
                    <input [(ngModel)]="project.is_active" [ngModelOptions]="{standalone: true}" />
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


export class EditProjectComponent implements OnInit  {
  project: Project;
  projectID: number;

  constructor(private router: Router, private projectService: ProjectService, private param: ActivatedRoute) {
    this.projectID = param.snapshot['pk'];
  }

  onSubmit(e: any) {
    console.log("Edit Project");
    console.log(this.project);

    this.project.start_date = this.project.start_date.toString();
    this.project.end_date = this.project.end_date.toString();

    this.projectService.updateProject(this.project.pk, this.project).subscribe(
      data => {
        alert(data);
        console.log(data);
      },
      error => {
        console.error('error' + error[0])
      },
      () => {
        alert("DONE");
      }
    )
  }

  ngOnInit() {
    this.loadProject(this.projectID);
  }

  private loadProject(id: number) {
    this.projectService.getProject(id)
      .subscribe(
        data => { this.project = data; this.projectID = data.pk; },
        error => console.error('Error: ' + error[0]),
        () => { console.log('LOADED') }
      );
  }

}
