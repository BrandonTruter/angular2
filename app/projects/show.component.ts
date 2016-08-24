/**
 * Created by brandon on 2016/08/23.
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { Project } from './../models/project';
import { ProjectService } from "../services/projects.service";
import { RouteParams } from "@angular/router-deprecated/esm";

@Component({
  moduleId: module.id,
  template: `
      <section class="container">
        <h2>Selected Project: <span value="{{projectID}}"></span></h2>
        <div class="row">
            <div class="black-text pull-left"><h6>Title</h6></div>
            <div class="blue-grey-text pull-right">{{project.title ? project.title : 'Unknown'}}</div>
        </div>
        <div class="row">
            <div class="black-text pull-left"><h6>Description</h6></div>
            <div class="blue-grey-text pull-right">{{project.description ? project.description : 'Not Specified'}}</div>
        </div>
        <div class="row">
            <div class="black-text pull-left"><h6>Start Date</h6></div>
            <div class="blue-grey-text pull-right">{{project.start_date ? project.start_date : 'Not Specified'}}</div>
        </div>
        <div class="row">
            <div class="black-text pull-left"><h6>End Date</h6></div>
            <div class="blue-grey-text pull-right">{{project.end_date ? project.end_date : 'Not Specified'}}</div>
        </div>        
        <div class="row">
            <div class="black-text pull-left"><h6>Is Billable</h6></div>
            <div class="blue-grey-text pull-right">{{project.is_billable ? project.is_billable : 'Not Specified'}}</div>
        </div>
        <div class="row">
            <div class="black-text pull-left"><h6>Is Active</h6></div>
            <div class="blue-grey-text pull-right">{{project.is_active ? project.is_active : 'Not Specified'}}</div>
        </div>
        <div class="col-xs-8 col-sm-offset-1">
          <button class="btn-primary" [routerLink]="['projects']">Back</button>
          <button class="btn-primary" [routerLink]="['editProject/' + projectID + '/']">Edit</button>
          <button (click)="removeProject(project.id)" class="red-text">Delete</button>
        </div>
      </section>
    
  `
})

export class ShowProjectComponent implements OnInit {
  errorMessage: string;
  // taskID: number;
  project: Project;

  private projectID: string;

  constructor( private router: Router, private param: ActivatedRoute, private projectService:ProjectService ){
    this.projectID = param.snapshot['id'];
  }

  removeProject(id: number) {
    this.projectService.removeProject(id).subscribe(
      data => {  console.log(data) },
      error => { this.errorMessage = <any>error },
      () => { alert("DONE"); }
    );
  }

  ngOnInit() {
    this.projectID = param.snapshot['id'];
  }

  updateProject(id: number, data: Project) {
    this.projectService.removeProject(id).subscribe(
      data => { this.project = data },
      error => { this.errorMessage = error },
      () => { console.log("DONE"); }
    );
  }

  private loadProject(id: number) {
    this.projectService.getProject(id)
      .subscribe(
        data => { this.project = data; },
        error => console.error('Error: ' + error[0]),
        () => { console.log('LOADED') }
      );
  }

}
