const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

// collect html templates filled out with each employees data
const render = employees => {
  const html = [];
  // if employee is a manager, run renderManager funtion with manager's constructed data object
  html.push(...employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
  );
  html.push(...employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  // if employee is a Intern, run renderIntern funtion with Intern's constructed data object
  html.push(...employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );
  // run renderMain function, passing in the array of  collected html templates form each employee
  return renderMain(html.join(""));

};
// find the 'manager.html' template
//use the replacePlaceholders function to find the RegExp "tag"(s) inside the template
// replace the "tag" with data returned from the prototype function
const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

// find the 'engineer.html' template
//use the replacePlaceholders function to find the RegExp "tag"(s) inside the template
// replace the "tag" with data returned from the prototype function
const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

// find the 'intern.html' template
//use the replacePlaceholders function to find the RegExp "tag"(s) inside the template
// replace the "tag" with data returned from the prototype function
const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

// find the 'main.html' template
//use the replacePlaceholders function to find the RegExp "tag"(s) inside the template
// replace the "tag" with data collected in the html array passed in from line 24
const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

// function that expects an html template sheet, 
// a "tag" word to find in the html template sheet,
// and a string that will replace the "tag",
// then the html template is returned with the updated data.
const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
// module.exports = renderMain;
