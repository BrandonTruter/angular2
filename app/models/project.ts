
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





// export class Tasks {
//   public id: number;
//   public title: string;
//   public due_date: string;
//   public estimated_hours: string;
//   public project: string;
//   public project_data: string;
//   constructor() {
//     this.id = 1;
//     this.title = "";
//     this.due_date = "";
//     this.estimated_hours = "";
//     this.project = "";
//     this.project_data = "";
//   }
// }


// export class Project {
//   public pk: number;
//   public title: string;
//   public description: string;
//   public start_date: Date;
//   public end_date: Date;
//   public is_billable: boolean;
//   public is_active: boolean;
//   public task_set: any;
//   public resource_set: any;
//   constructor() {
//     this.pk = 1;
//     this.title = "";
//     this.description = "";
//     this.start_date = new Date();
//     this.end_date = new Date();
//     this.is_billable = true;
//     this.is_active = true;
//     this.task_set = [];
//     this.resource_set = [];
//   }
// }


// export class Note {
//   public id: number = -1;
//   public name: string;
//   public text: string;
//   public created: Date;
//   public modified: Date;
//   public readOnly = false;
//   constructor() {
//     this.name = "New Note";
//     this.text = "";
//     this.created = new Date();
//     this.modified = new Date();
//   }
// }

// export class Project {
//   pk: number;
//   title: string;
//   description: string;
//   start_date: string;
//   end_date: string;
//   is_billable: boolean;
//   is_active: boolean;
//   task_set: string[];
//   resource_set: string[];
// }

