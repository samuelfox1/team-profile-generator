// link page to Employee class page
const Employee = require('./Employee')

// data that only Interns input
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email)
        this.school = school
    }
    getSchool() {
        return this.school
    }
    getRole() {
        return 'Intern'
    }
}

// exports the constructed Intern data object
module.exports = Intern;