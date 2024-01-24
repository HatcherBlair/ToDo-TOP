const toDoObjects = require('./toDoObjects');
const toDoUI = require('./toDoUI');
import './style.css';

// When the page is loaded create the all project
function runFirst() {
    const all = new toDoObjects.Project('All', 'Contains all Projects');
    toDoObjects.ProjectList.addProject(all);
    toDoUI.makePage();
}

runFirst();