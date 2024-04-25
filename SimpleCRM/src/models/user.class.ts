export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: number;
  street: string;
  zipCode: number;
  city: string;
  timestamp: number;

  constructor(obj?: any) {
    this.id = obj ? obj.id : "";
    this.firstName = obj ? obj.firstName : "";
    this.lastName = obj ? obj.lastName : "";
    this.email = obj ? obj.email : "";
    this.birthDate = obj ? obj.birthDate : "";
    this.street = obj ? obj.street : "";
    this.zipCode = obj ? obj.zipCode : ""; 
    this.city = obj ? obj.city : "";
    this.timestamp = obj ? obj.timestamp : "";
  }

  toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
      
      
    };
  }
}
