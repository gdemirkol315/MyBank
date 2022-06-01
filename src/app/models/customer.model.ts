
export class Customer {
  name:string;
  lastname:string;
  type:string;
  address:string;
  entitytype:string;
  rating:number;
  id: string;


  constructor(id:string, name: string, lastname: string, type: string, address: string, entitytype: string, rating: number) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.type = type;
    this.address = address;
    this.entitytype = entitytype;
    this.rating = rating;
  }
}


