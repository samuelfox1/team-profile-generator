const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { Console } = require("console");

function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: '\n***** WELCOME TO TEAM-PAGE CREATOR *****\n',
                choices: ['Start by entering the manager\'s information'],
                name: 'choice',
            },
        ])
        .then(x => {
            managerPrompt()
        })

}

function managerPrompt() {

    console.log('\n' + '*'.repeat(10) + ' MANAGER ' + '*'.repeat(40))
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Name:',
                name: 'name',
            },
            {
                type: 'input',
                message: 'I.D #:',
                name: 'id',
            },
            {
                type: 'input',
                message: 'Email:',
                name: 'email',
            },
            {
                type: 'input',
                message: 'Office number:',
                name: 'officeNumber',
            },
        ])
        .then(x => {
            console.log('*'.repeat(50) + '\n')
            const manager = new Manager(x.name, x.id, x.email, x.officeNumber)

            inquirer
                .prompt([
                    {
                        type: 'confirm',
                        message: 'Is this information correct?',
                        name: 'confirm'
                    }
                ])
                .then(({ confirm }) => {
                    if (confirm) {
                        console.log(manager)
                        home()
                    } else {
                        managerPrompt()
                    }
                })
        })
}

function home() {
    console.log('\n' + '*'.repeat(10) + ' HOME ' + '*'.repeat(40))
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do next?',
                choices: ['Add employee', 'Finish & create team page', 'Quit'],
                name: 'choice',
            }
        ])
        .then(({ choice }) => {
            switch (choice) {
                case 'Add employee':
                    console.log('*'.repeat(50) + '\n')
                    employeeRole();
                    break;

                case 'Finish & create team page':
                    console.log('*'.repeat(50) + '\n')
                    createTeam();
                    break;

                default:
                    break;
            }
        })
}

function employeeRole() {
    console.log('\n' + '*'.repeat(10) + ' EMPLOYEE ' + '*'.repeat(40))
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Select employee role',
                name: 'choice',
                choices: ['engineer', 'intern', 'home']
            }
        ])
        .then(x => {
            switch (x.choice) {
                case 'engineer':
                    engineerPrompt()
                    break
                case 'intern':
                    internPrompt()
                    break
                case 'home':
                    home()
                    break
            }
        })
}

function engineerPrompt() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Name:',
                name: 'name',
            },
            {
                type: 'input',
                message: 'I.D. #:',
                name: 'id',
            },
            {
                type: 'input',
                message: 'Email:',
                name: 'email',
            },
            {
                type: 'input',
                message: 'GitHub username:',
                name: 'github',
            },
        ])
        .then(x => {
            console.log('*'.repeat(50) + '\n')
            const engineer = new Engineer(x.name, x.id, x.email, x.github)
            inquirer
                .prompt([
                    {
                        type: 'confirm',
                        message: 'Is this information correct?',
                        name: 'confirm'
                    }
                ])
                .then(({ confirm }) => {
                    if (confirm) {
                        console.log(engineer)
                        home()
                    } else {
                        employeeRole()
                    }
                })
        })

}

function internPrompt() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Name:',
                name: 'name',
            },
            {
                type: 'input',
                message: 'I.D. #:',
                name: 'id',
            },
            {
                type: 'input',
                message: 'Email:',
                name: 'email',
            },
            {
                type: 'input',
                message: 'School:',
                name: 'school',
            },
        ])
        .then(x => {
            console.log('*'.repeat(50) + '\n')
            const intern = new Intern(x.name, x.id, x.email, x.github)
            inquirer
                .prompt([
                    {
                        type: 'confirm',
                        message: 'Is this information correct?',
                        name: 'confirm'
                    }
                ])
                .then(({ confirm }) => {
                    if (confirm) {
                        console.log(intern)
                        home()
                    } else {
                        employeeRole()
                    }
                })
        })
}

function createTeam() {
    console.log('\n' + '*'.repeat(10) + ' CREATING TEAM PAGE ' + '*'.repeat(40))
    console.log('team page function here')
    console.log('*'.repeat(50) + '\n')
    home()
}

init()


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
