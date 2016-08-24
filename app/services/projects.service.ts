import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { UserService } from '../services/user.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

const SERVICE_URI = 'http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects';

@Injectable()
export class ProjectService {
  private projectsUrl = 'http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects/';
  private projects: Project[];

  project: Project;

  constructor(private http: Http, private userService: UserService ) {}

  getPromise(): Promise<any> {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + this.userService.getToken());
    return this.http.get('http://projectservice.staging.tangentmicroservices.com/api/v1/projects/', { headers: headers, body: ''})
      .toPromise().then(response => response.json()).catch(this.handlePromiseError);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get(this.projectsUrl, { headers: this.getHeaders(), body: this.projects })
      .map(this.extractData)
      .catch(this.handleError);
  }

  // GET /api/v1/projects/{pk}/

  getProject(id: number) {

    return this.http.get(`${SERVICE_URI}/${id}/`, {headers: this.getHeaders(), body: ''})
      .map(response => response.json());
  }

  addProjectPromise(data: Project): Promise<any> {
    return this.http.post('http://projectservice.staging.tangentmicroservices.com/api/v1/projects/', data, { headers: this.postHeaders() })
      .toPromise().then(response => response.json()).catch(this.handlePromiseError);
  }

  // POST /api/v1/projects/

  saveProject(project: Project) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + this.userService.getToken());

    return this.http.post(`${SERVICE_URI}/`, JSON.stringify(project), {headers: headers})
      .map(response => response.json());
  }

  // PUT /api/v1/projects/{pk}/
  // PATCH /api/v1/projects/{pk}/

  updateProject(id: number, data: Project) {
    return this.http.patch(`${SERVICE_URI}/${id}/`, JSON.stringify(data), {headers: this.getHeaders()})
      .map(response => response.json());
  }

  // DELETE /api/v1/projects/{pk}/

  removeProject(id: number) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + this.userService.getToken());

    return this.http.delete(`${SERVICE_URI}/${id}/`, {headers: this.getHeaders()})
      .map(response => response.json().pk);
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + this.userService.getToken());
    return headers;
  }

  private postHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + this.userService.getToken());
    return headers;
  }

  private extractData(res: Response) {
    let body = res.json().title;
    return body || res;
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private handlePromiseError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getTestProjects(): Project[] {
    return [
      {
        "pk": 1,
        "title": "ACME Hardware Website",
        "description": "Supplies for Roadrunners",
        "start_date": "2015-02-18",
        "end_date": null,
        "is_billable": true,
        "is_active": true,
        "task_set": [
          {
            "id": 3,
            "title": "Development",
            "due_date": "2015-06-30",
            "estimated_hours": "100.00",
            "project": 1,
            "project_data": {
              "pk": 1,
              "title": "ACME Hardware Website",
              "description": "Supplies for Roadrunners",
              "start_date": "2015-02-18",
              "end_date": null,
              "is_billable": true,
              "is_active": true
            }
          }
        ],
        "resource_set": []
      },
      {
        "pk": 2,
        "title": "Wayne Enterprises Mobile App",
        "description": "An app for spelunking fans",
        "start_date": "2015-02-18",
        "end_date": null,
        "is_billable": true,
        "is_active": true,
        "task_set": [],
        "resource_set": []
      },
      {
        "pk": 3,
        "title": "Stark Industries CRM",
        "description": "Helping iron man keep track of his customers",
        "start_date": "2015-02-18",
        "end_date": null,
        "is_billable": true,
        "is_active": true,
        "task_set": [
          {
            "id": 2,
            "title": "Project Management",
            "due_date": "2015-04-01",
            "estimated_hours": "150.00",
            "project": 3,
            "project_data": {
              "pk": 3,
              "title": "Stark Industries CRM",
              "description": "Helping iron man keep track of his customers",
              "start_date": "2015-02-18",
              "end_date": null,
              "is_billable": true,
              "is_active": true
            }
          },
          {
            "id": 1,
            "title": "Development",
            "due_date": "2015-04-01",
            "estimated_hours": "300.00",
            "project": 3,
            "project_data": {
              "pk": 3,
              "title": "Stark Industries CRM",
              "description": "Helping iron man keep track of his customers",
              "start_date": "2015-02-18",
              "end_date": null,
              "is_billable": true,
              "is_active": true
            }
          }
        ],
        "resource_set": []
      },
      {
        "pk": 4,
        "title": "Capcom Anniversary Parade",
        "description": "Cosplay festival in character towns",
        "start_date": "2016-08-15",
        "end_date": "2017-03-05",
        "is_billable": true,
        "is_active": true,
        "task_set": [],
        "resource_set": []
      }
    ];
  }

}
