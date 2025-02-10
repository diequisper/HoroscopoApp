export class User {
  id : number;
  name : string;
  birthDate : Date;
  timeBirth? :  Date;
  country : string;
  city? : string;
  email? : string;
  username : string;
  password : string;
  static users : User[] = [];


  constructor(id : number, name : string, birthDate : Date, country : string, 
    username : string, password : string, timeBirth ?: Date, city ?: string, email ?: string){
    this.id = id;
    this.name = name;
    this.birthDate = birthDate;
    this.timeBirth = timeBirth;
    this.country = country; 
    this.city = city;
    this.email = email
    this.username = username;
    this.password = password;
  }

  static addUser(thisUser : User) : void{
    this.users.push(thisUser)
  }

  static getAllUser() : User[]{
    return this.users
  }
}