import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { AuthService } from '../auth/auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProjectService {
  private projectsUrl = 'http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects';
  private projects: Project[];

  constructor(private http: Http, private authService: AuthService ) {}

  getProjects(): Observable<Project[]> {
    return this.http.get(this.projectsUrl, { headers: this.getHeaders(), body: this.projects })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + this.authService.getAuthToken());
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



    getPromise(): Promise<any> {
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Token ' + this.authService.getAuthToken());
      return this.http.get('http://projectservice.staging.tangentmicroservices.com/api/v1/projects/', { headers: headers, body: ''})
        .toPromise().then(response => response.json()).catch(this.handlePromiseError);
    }

    private handlePromiseError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
    }

  // getOrders(id: number) : Observable<IOrder[]> {
  //   return this.http.get(this._baseUrl + 'orders.json')
  //     .map((res: Response) => {
  //       this.orders = res.json();
  //       return this.orders.filter((order: IOrder) => order.customerId === id);
  //     })
  //     .catch(this.handleError);
  // }

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


// getProjects(id: number): Observable<Project[]> {
//   return this.http.get(this.projectsUrl, { headers: this.getHeaders() })
//     .map((res) => {
//       this.projects = <Project[]>res.json();
//       return this.projects.filter((task: Tasks) => task.project === id);
//     })
