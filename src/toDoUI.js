const toDoObjects = require('./toDoObjects')

/* DOM Related Functions */

// Loads the entire page, defaults to all project
function makePage(projectIndex = 0) {
    makeNavBar();
    makeHeader();
    displayProject(toDoObjects.ProjectList.getProjectAt(projectIndex));
}

// Makes the NavBar that displays all current projects
function makeNavBar() {
    // Reset the navBar
    const navBar = document.querySelector('.navbar');
    navBar.innerHTML = '';

    // Create the title
    const title = document.createElement('h4');
    title.textContent = 'Project List';
    navBar.appendChild(title);

    // Create and attach the project list
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

// Creates the header for the website
function makeHeader() {
    // Reset the header
    const header = document.querySelector('.header');
    header.innerHTML = '';

    // Create the title
    const title = document.createElement('h1');
    title.textContent = 'Doer - Track Your Life';
    header.appendChild(title);

    // Create the addProject button
    const addProject = document.createElement('button');
    addProject.textContent = 'Create a New Project';
    addProject.addEventListener('click', (e) => newProjectEvent(e));
    header.appendChild(addProject);
}

// Displays the selected project on the screen
function displayProject(project) {
    // Reset the container
    const itemContainer = document.querySelector('.todo-display');
    itemContainer.innerHTML = '';

    // Header contains project name, description, and add task
    const projectHeader = document.createElement('div');
    projectHeader.classList.add('project-header');
    itemContainer.appendChild(projectHeader);

    const projectTitle = document.createElement('p');
    projectTitle.classList.add('project-title');
    projectTitle.textContent = project.title;
    projectHeader.appendChild(projectTitle);

    const projectDesciption = document.createElement('p');
    projectDesciption.textContent = project.description;
    projectHeader.appendChild(projectDesciption);

    const newItemBtn = document.createElement('button');
    newItemBtn.textContent = 'New Task';
    newItemBtn.addEventListener('click', (e) => newTaskEvent(e));
    projectHeader.appendChild(newItemBtn);

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

/* Event Listeners */
function newProjectEvent(e) {
    // Show Modal and Overlay
    const modal = document.querySelector('.new-project-modal');
    const overlay = document.querySelector('.overlay');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');

    // Create event listener for close button
    const closeBtn = document.querySelector('.new-project-btn-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    }, {once: true});

    // Create event listener for submit button
    const submitBtn = document.querySelector('.new-project-submit');
    submitBtn.addEventListener('click', (e) => {
        // Don't reload the page
        e.preventDefault();

        // Get values from form
        const projectTitle = document.getElementById('project-title').value;
        const projectDesciption = document.getElementById('project-description').value;
        
        // Create new project and try to add it to the list
        // addProject returns index if successful, false if not
        const newProject = new toDoObjects.Project(projectTitle, projectDesciption);
        const index = toDoObjects.ProjectList.addProject(newProject);
        if (index) {
            // Insert successful, hide modal and display new project
            modal.classList.add('hidden');
            overlay.classList.add('hidden');
            document.getElementById('new-project-form').reset();
            makePage(index);
        } else {
            // insert failed, display error
            alert('There is already a project with this title');
        }
    }, {once: true})
}

function newTaskEvent(e) {
    // Show modal and overlay
    const modal = document.querySelector('.new-item-modal');
    const overlay = document.querySelector('.overlay');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');

    // Create event listened for close button
    const closeBtn = document.querySelector('.new-item-btn-close');
    closeBtn.addEventListener('click', (e) => {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    }, {once: true});

    // Create even listened for submit button
    const submitBtn = document.querySelector('.new-item-submit');
    submitBtn.addEventListener('click', (e) => {
        // Don't reload the page
        e.preventDefault();

        // Get values from form and make item
        const itemTitle = document.getElementById('item-title').value;
        const itemDescription = document.getElementById('item-description').value;
        const tempDueDate = document.getElementById('item-due-date').value;
        const itemDueDate = new Date(tempDueDate);
        const itemPriortiy = document.getElementById('item-priority').value;
        const itemNotes = document.getElementById('item-notes').value;
        const newItem = new toDoObjects.Item(itemTitle, itemDescription, itemDueDate, itemPriortiy, itemNotes);
        
        if (toDoObjects.ProjectList.addItemByName(
            document.querySelector('.project-title').textContent, newItem)) {
            modal.classList.add('hidden');
            overlay.classList.add('hidden');
            document.getElementById('new-item-form').reset();
            // Making an update project funtion later
        } else {
            alert('There is already an item with this title');
        }
    }, {once: true})
}

module.exports = {makePage};