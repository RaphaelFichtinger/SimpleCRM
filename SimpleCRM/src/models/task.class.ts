export class Task {
    id: string;
    EmployeeName: string;
    StartTime: number;
    Deadline: number;
    TaskName: string;
    CustomerName: string;
    Location: string;
    timestamp: number;
  
    constructor(obj?: any) {
      this.id = obj ? obj.id : "";
      this.EmployeeName = obj ? obj.firstName : "";
      this.StartTime = obj ? obj.StartTime : "";
      this.Deadline = obj ? obj.Deadline : "";
      this.TaskName = obj ? obj.TaskName : "";
      this.CustomerName = obj ? obj.CustomerName : "";
      this.Location = obj ? obj.zipCode : ""; 
      this.timestamp = obj ? obj.timestamp : "";
    }
  
    toJSON() {
      return {
        id: this.id,
        EmployeeName: this.EmployeeName,
        StartTime: this.StartTime,
        Deadline: this.Deadline,
        TaskName: this.TaskName,
        CustomerName: this.CustomerName,
        Location: this.Location,
      };
    }
  }
  