const Employee = require('./Employee')

class Teamname extends Employee {
    constructor(name, id, email, school) {
        super(name)
    }
    getTeamname() {
        return this.name
    }
    getRole() {
        return 'Teamname'
    }
}

module.exports = Teamname;