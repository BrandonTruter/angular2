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
      <section class="container">
        <h2>Selected Project</h2>
        
        <div>{{errorMessage}}</div>
        
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
          <button (click)="removeProject(project.pk)" class="red-text">Delete</button>
        </div>
      </section>
    
  `
})

export class ShowProjectComponent implements OnInit {
  project: Project;
  projectID: number;
  errorMessage: string;
  constructor( private router: Router, private route: ActivatedRoute, private projectService:ProjectService ){ }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.project.pk = +params['id'];
    });
  }

  removeProject(id: number) {
    this.projectService.removeProject(id).subscribe(
      data => {  this.router.navigate(['projects/index']) },
      error => { this.errorMessage = <any>error },
      () => { alert("DONE"); }
    );
  }

  updateProject(id: number, data: Project) {
    this.projectService.removeProject(id).subscribe(
      project => {
        this.project = project;
        this.router.navigate(['/projects/', project.id]);
      },
      error => { this.errorMessage = error },
      () => { console.log("DONE"); }
    );
  }

  loadProject(id: number) {
    this.projectService.getProject(id)
      .subscribe(
        data => { this.project = data; },
        error => console.error('Error: ' + error[0]),
        () => { console.log('LOADED') }
      );
  }

}

// loadProject(id: number) {
//   this.projectService.getProject(id)
//     .subscribe(
//       data => { this.project = data; this.projectID = data.pk; },
//       error => console.error('Error: ' + error[0]),
//       () => { console.log('LOADED') }
//     );
// }

// this.projectID = this.route.params['id'];
// this.loadProject(this.projectID).map(project => this.project = project);
