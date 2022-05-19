
export class Customer {
  name:string;
  lastname:string;
  type:string;
  address:string;
  entitytype:string;
  rating:number;


  constructor(name: string, lastname: string, type: string, address: string, entitytype: string, rating: number) {
    this.name = name;
    this.lastname = lastname;
    this.type = type;
    this.address = address;
    this.entitytype = entitytype;
    this.rating = rating;
  }
}


