// link page to Employee class page
const Employee = require('./Employee')

// data that only engineers input
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = github;
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        return 'Engineer';
    }
}

//exports the constructe Engineer data object
module.exports = Engineer;