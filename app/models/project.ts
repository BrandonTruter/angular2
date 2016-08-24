
export class Project {
  public pk: number;
  public title: string;
  public description: string;
  public start_date: string;
  public end_date: string;
  public is_billable: boolean;
  public is_active: boolean;
  public task_set: any;
  public resource_set: any;
  constructor() {
    this.pk = 1;
    this.title = "";
    this.description = "";
    this.start_date = "";
    this.end_date = "";
    this.is_billable = true;
    this.is_active = true;
    this.task_set = [];
    this.resource_set = [];
  }
}

// export class Project {
//   public pk: number;
//   public title: string;
//   public description: string;
//   public start_date: string;
//   public end_date: string;
//   public is_billable: boolean;
//   public is_active: boolean;
//   public task_set: Tasks[];
//   public resource_set: any[];
//   constructor() {
//     this.pk = 1;
//     this.title = "";
//     this.description = "";
//     this.start_date = "";
//     this.end_date = "";
//     this.is_billable = true;
//     this.is_active = true;
//     this.task_set = [];
//     this.resource_set = [];
//   }
// }


export class Tasks {
  public id: number;
  public title: string;
  public due_date: string;
  public estimated_hours: string;
  public project: number;
  public project_data: any;
  constructor() {
    this.id = 1;
    this.title = "";
    this.due_date = "";
    this.estimated_hours = "";
    this.project = 1;
    this.project_data = [];
  }
}
