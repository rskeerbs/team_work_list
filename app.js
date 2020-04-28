const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

let employees = []

function start() {
    inquirer
      .prompt({
        type: "list",
        name: "create",
        message: "Would you like to make an employee team card?",
        choices: ["Yes", "No"]
         })
      .then(function(answer) {
        if (answer.create === "Yes") {
            getRole();
        
        } else{
            if (employees.length > 0){
                let htmlString = render(employees);
                fs.writeFile(outputPath, htmlString, function(err){
                    if (err) throw err;
                    console.log("File successfully written!");
                });
            }
            else {
                console.log("You haven't entered any employees.  Goodbye!")
            }
        }
    });
  }

function getRole() {
    inquirer
       .prompt([
            {
              type: "list",
              name: "role",
              message: "What position would you like to make a listing for?",
              choices: ["Manager", "Engineer", "Intern"]
              },
          ])
          
        .then(function(answer) {
            if (answer.role === "Manager") {
              getManager();
            } else if (answer.role === "Engineer"){
                getEngineer();
            } else {
              getIntern()
            }
          });
    }

function getManager() {
    inquirer
      .prompt([
            {
            type: "input",
            name: "office",
            message: "What is their office number?"
            },
        ])
      .then(async function(answer) {
            let employeeAnswers = await inquirer.prompt(employeeQuestions)
            employees.push(new Manager(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, answer.office))
            start();
        } 
      );
    }

function getEngineer() {
    inquirer
      .prompt([
            {
            type: "input",
            name: "github",
            message: "What is their GitHub username?"
            },
        ])
      .then(async function(answer) {
         let employeeAnswers = await inquirer.prompt(employeeQuestions)
         employees.push(new Engineer(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, answer.github))
         start();
       } 
     );
    }

function getIntern() {
    inquirer
      .prompt([
        {
         type: "input",
         name: "school",
         message: "What school are they attending?"
        },
       ])
      
      .then(async function(answer) {
            let employeeAnswers = await inquirer.prompt(employeeQuestions)
            employees.push(new Intern(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, answer.school))
            start();
       } 
     );
}

  let employeeQuestions = [
      {
      type: "input",
      name: "name",
      message: "What is the employee's name?",
       },
              
      {
      type: "input",
      name: "email",
      message: "What is the employee's email?"
      },
      {
      type: "input",
      name: "id",
      message: "What is the employee's id number?"
      },
]

start()

  