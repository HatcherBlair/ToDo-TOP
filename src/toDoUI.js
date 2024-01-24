const toDoObjects = require('./toDoObjects')

// Loads the entire page, defaults to all project
function makePage(projectIndex = 0) {
    makeNavBar();
    displayProject(toDoObjects.ProjectList.getProjectAt(projectIndex));
}

// Makes the NavBar that displays all current projects
function makeNavBar() {
    // Create and attach the list
    const navBar = document.querySelector('.navbar');
    const projectListDOM = document.createElement('ul');
    navBar.appendChild(projectListDOM);

    // Populate the list from the ProjectList
    const projectList = toDoObjects.ProjectList.projectList;
    projectList.forEach(project => {
        const projectLI = document.createElement('li');
        projectLI.textContent = project.title;
        projectListDOM.appendChild(projectLI);
    });
}

// Displays the selected project on the screen
function displayProject(project) {
    const itemContainer = document.querySelector('.todo-display');
    // Case where project is empty
    if (!project.items.length) {
        const defaultDisplay = document.createElement('div');
        defaultDisplay.textContent = "There are no items in this project...";
        itemContainer.appendChild(defaultDisplay);
        return;
    }

    // Case where project is not empty
    project.items.forEach(item => {
        const itemCard = makeItemCard(item);
        itemContainer.appendChild(itemCard);
    });
}

// Makes an item card to display in the list of projects
function makeItemCard(item) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('item-card');

    const itemPriortiy = document.createElement('button');
    itemPriortiy.classList.add('item-priority-btn');
    itemPriortiy.textContent = item.priority;
    cardContainer.appendChild(itemPriortiy);

    const itemTitle = document.createElement('h4');
    itemTitle.classList.add('item-title')
    itemTitle.textContent = item.title;
    cardContainer.appendChild(itemTitle);

    const itemDescription = document.createElement('p');
    itemDescription.classList.add('item-description');
    itemDescription.textContent = item.description;
    cardContainer.appendChild(itemDescription);

    const itemNotes = document.createElement('p');
    itemNotes.classList.add('item-description');
    itemNotes.textContent = item.notes;
    cardContainer.appendChild(itemNotes);

    return cardContainer;
}

module.exports = {makePage};