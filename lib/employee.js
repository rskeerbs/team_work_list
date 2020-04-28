// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole(){
    return "Employee";
  }
};
module.exports = Employee;


 //data should be written to the appropriate file and then appended to the main.html file where the {{ team  }} is