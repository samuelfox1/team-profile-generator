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
                        employees.push(manager)
                        home()
                    } else {
                        managerPrompt()
                    }
                })
        })
}

function home() {
    console.log('\n' + '*'.repeat(10) + ' HOME ' + '*'.repeat(40))
    console.log(`Saved employees:`)
    console.log(employees)
    console.log('*'.repeat(50) + '\n')

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
                    console.log('*'.repeat(50) + '\n')
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
                        employees.push(engineer)
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
            const intern = new Intern(x.name, x.id, x.email, x.school)
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
                        employees.push(intern)
                        home()
                    } else {
                        employeeRole()
                    }
                })
        })
}

function createTeam() {
    // console.log(employeeHtml)
    console.log('\n' + '*'.repeat(10) + ' CREATING TEAM PAGE ' + '*'.repeat(40))
    const employeeHtml = render(employees)
    fs.writeFile('./output/team.html', employeeHtml, (error) => {
        if (error) {
            console.log(error)
        } else {
            console.log('enjoi!')
        }
    })
    console.log('*'.repeat(50) + '\n')
    home()
}

init()