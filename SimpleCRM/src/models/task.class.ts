export class Task {
    id: string;
    employeeName: string;
    startTime: number;
    deadline: number;
    taskName: string;
    description: string;
    customerName: string;
    location: string;
    timestamp: number;
  
    constructor(obj?: any) {
      this.id = obj ? obj.id : "";
      this.employeeName = obj ? obj.firstName : "";
      this.startTime = obj ? obj.StartTime : "";
      this.deadline = obj ? obj.Deadline : "";
      this.taskName = obj ? obj.TaskName : "";
      this.description = obj ? obj.description : "";
      this.customerName = obj ? obj.CustomerName : "";
      this.location = obj ? obj.zipCode : ""; 
      this.timestamp = obj ? obj.timestamp : "";
    }
  
    toJSON() {
      return {
        id: this.id,
        employeeName: this.employeeName,
        startTime: this.startTime,
        deadline: this.deadline,
        taskName: this.taskName,
        description: this.description,
        customerName: this.customerName,
        location: this.location,
      };
    }
  }
  