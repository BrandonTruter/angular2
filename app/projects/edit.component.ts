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
              <h1>Edit project</h1>
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

// return this.loadProject(this.projectID).map(project => this.project = project);
// this.project.start_date = this.project.start_date.toString();
// this.project.end_date = this.project.end_date.toString();

// this.route.params.forEach((params: Params) => {
//   let id = +params['id'];
//   this.loadProject(id).then(project => this.project = project);
// });


// @Component({
//   selector: 'app',
//   template: `<input type="datetime-local" [value]="date"
//           (change)="date=$event.target.value" /> {{date}}`
// })
// export class AppComponent {
//   date: string;
//   constructor() {
//     this.date = new Date().toISOString().slice(0, 16);
//   }
// }

// private toDateString(date: Date): string {
//   return (date.getFullYear().toString() + '-'
//     + ("0" + (date.getMonth() + 1)).slice(-2) + '-'
//     + ("0" + (date.getDate())).slice(-2))
//     + 'T' + date.toTimeString().slice(0,5);
// }

// @Component({
//   selector: 'my-app',
//   template: `
//       <form>
//         <input type="datetime-local" [(ngModel)]="dateTimeLocal"><br />
//         {{dateTimeLocal}}
//       </form>
//     `
// })
// export class AppComponent {
//   private _dateTimeLocal: Date;
//
//   constructor() {
//     this._dateTimeLocal = new Date();
//   }
//
//   private parseDateToStringWithFormat(date: Date): string {
//     let result: string;
//     let dd = date.getDate().toString();
//     let mm = (date.getMonth() + 1).toString();
//     let hh = date.getHours().toString();
//     let min = date.getMinutes().toString();
//     dd = dd.length === 2 ? dd : "0" + dd;
//     mm = mm.length === 2 ? mm : "0" + mm;
//     hh = hh.length === 2 ? hh : "0" + hh;
//     min = min.length === 2 ? min : "0" + min;
//     result = [date.getFullYear(), '-', mm, '-', dd, 'T', hh, ':', min].join('');
//
//     return result;
//   }
//
//   public set dateTimeLocal(v: string) {
//     let actualParsedDate = v ? new Date(v) : new Date();
//     let normalizedParsedDate = new Date(actualParsedDate.getTime() + (actualParsedDate.getTimezoneOffset() * 60000));
//     this._dateTimeLocal = normalizedParsedDate;
//   }
//
//
//   public get dateTimeLocal(): string {
//     return this.parseDateToStringWithFormat(this._dateTimeLocal);
//   }
// }

// Sadly, NgModel does not work at this time for input of type date. I found a simple workaround however.
//
// // In your HTML
// <input #myDatePicker
// type="date"
// value='{{ myDate | date:"yyyy-MM-dd" }}'
// (input)="onInput(myDatePicker.value)" />
//
// // In your component (TypeScript):
//   public myDate: Date;
//
// public onInput(value: Date): void{
//
//   this.myDate = value;
// }



// <input type="date" [(ngModel)]="company.birthdate"/>

