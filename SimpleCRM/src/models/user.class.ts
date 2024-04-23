export class User {
  firstName: string;
  lastName: string;
  birthDate: number;
  street: string;
  zipCode: number;
  city: string;
  timestamp: number;

  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : "";
    this.lastName = obj ? obj.lastName : "";
    this.birthDate = obj ? obj.birthDate : "";
    this.street = obj ? obj.street : "";
    this.zipCode = obj ? obj.zipCode : ""; 
    this.city = obj ? obj.city : "";
    this.timestamp = obj ? obj.timestamp : "";;
  }

  toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
      
    };
  }
}
