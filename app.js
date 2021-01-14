// linking project sheets and library features
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

const employees = []

// Welcome Message, 
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
            // launch manager input, this only happens once per program cycle
            managerPrompt()
        })

}

// manager input
function managerPrompt() {
    // message to screen
    console.log('\n' + '*'.repeat(10) + ' MANAGER ' + '*'.repeat(40))
    // manager inputs  data here
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
            // message on screen
            console.log('*'.repeat(50) + '\n')
            // constructs new manager object from the user input
            const manager = new Manager(x.name, x.id, x.email, x.officeNumber)
            // ask user to confirm the input data
            inquirer
                .prompt([
                    {
                        type: 'confirm',
                        message: 'Is this information correct?',
                        name: 'confirm'
                    }
                ])
                .then(({ confirm }) => {
                    // if conifrmed, add manager object to employees array and send user to homescreen
                    if (confirm) {
                        employees.push(manager)
                        home()

                        // if user declines, relaunch manager prompt to re-enter data
                    } else {
                        managerPrompt()
                    }
                })
        })
}

// view saved employee objects
function viewEmployees() {
    // title messsage
    console.log('\n' + '*'.repeat(10) + ' EMPLOYEE LIST ' + '*'.repeat(40))
    // display logged employee data for user to keep track
    console.log(`Saved employees:`)
    console.log(employees)
    console.log('*'.repeat(50) + '\n')

    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Press ENTER to return home',
                choices: ['Home'],
                name: 'choice',
            }
        ])
        .then(({ choice }) => {
            home()

        })
}

// home page
function home() {
    // title messsage
    console.log('\n' + '*'.repeat(10) + ' HOME ' + '*'.repeat(40))
    // prompt user what to do next
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do next?',
                choices: ['Add employee', 'View added employees', 'Finish & create team.html page', 'Quit'],
                name: 'choice',
            }
        ])
        .then(({ choice }) => {
            switch (choice) {
                // if user selects, 'add employee', launch prompts
                case 'Add employee':
                    console.log('*'.repeat(50) + '\n')
                    employeeRole();
                    break;

                // if user selects, 'View added employees', show them data from 'employees' array
                case 'View added employees':
                    console.log('*'.repeat(50) + '\n')
                    viewEmployees();
                    break;

                // if user selects, 'Finish & create team page', create the html page in the 'output' folder.
                case 'Finish & create team.html page':
                    console.log('*'.repeat(50) + '\n')
                    createTeam();
                    break;

                default:
                    // if 'Quit' is selecte, end program
                    console.log('*'.repeat(50) + '\n')
                    break;
            }
        })
}

// employee role selection
function employeeRole() {
    console.log('\n' + '*'.repeat(10) + ' EMPLOYEE ' + '*'.repeat(40))
    // select employee role
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
                // if user selects engineer, launch engineer questions
                case 'engineer':
                    engineerPrompt()
                    break
                // if user selects intern, launch intern questions
                case 'intern':
                    internPrompt()
                    break
                // if user selects home, return home
                case 'home':
                    home()
                    break
            }
        })
}

// engineer input
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
            // message to screen
            console.log('*'.repeat(50) + '\n')
            // construct a new Engineer object with users input data
            const engineer = new Engineer(x.name, x.id, x.email, x.github)
            // confirm data entered is correct
            inquirer
                .prompt([
                    {
                        type: 'confirm',
                        message: 'Is this information correct?',
                        name: 'confirm'
                    }
                ])
                .then(({ confirm }) => {
                    // if data is correct, push engineer object to employees array and return home
                    if (confirm) {
                        employees.push(engineer)
                        home()
                    } else {
                        // if data is not correct, restart employee user input
                        employeeRole()
                    }
                })
        })

}

// intern input
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
            // message to screen
            console.log('*'.repeat(50) + '\n')
            // construct new intern object from user input data
            const intern = new Intern(x.name, x.id, x.email, x.school)
            // confirm data entry is correct
            inquirer
                .prompt([
                    {
                        type: 'confirm',
                        message: 'Is this information correct?',
                        name: 'confirm'
                    }
                ])

                .then(({ confirm }) => {
                    // if data is correct, push intern object to employees array and return home
                    if (confirm) {
                        employees.push(intern)
                        home()
                    } else {
                        // if data is not correct, restart employee user input
                        employeeRole()
                    }
                })
        })
}

// final step to create team.html document
function createTeam() {
    // message to screen
    console.log('\n' + '*'.repeat(10) + ' CREATING TEAM.HTML DOCUMENT ' + '*'.repeat(40))
    // send employees array to linked employeeHtml function, whick will return the finished team.html text
    const employeeHtml = render(employees)
    // create team.html with the text data from employeeHtml
    fs.writeFile('./output/team.html', employeeHtml, (error) => {
        // if it errors, display the error
        if (error) {
            console.log(error)
        }
    })
    console.log('\n' + '*'.repeat(10) + ' FILE LOCATED IN \'./output/team.html\' ' + '*'.repeat(40))
    home()
}

init()