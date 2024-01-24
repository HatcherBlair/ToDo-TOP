// An item is one task on a to-do list
// All items belong to the project 'All', they can belong to multiple projects at a time
class Item {
    complete = false;

    constructor(title, description, dueDate, priority=0, notes="No notes...") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }

    // Getters
    get complete() {return this.complete}

    // Setters
    set complete(complete) {this.complete = complete}
}

// A project is a collection of items
// All items belong to the 'All' project
class Project {
    constructor(title, description='A project', items=[]) {
        this.title = title;
        this.description = description;
        this.items = items;
    }

    // Adds an item to the project
    addItem(newItem) {
        if (this.items.find(item => item.title == newItem.title)) {
            // Not unique, return false
            return false;
        } else {
            // Unique, add to list
            this.items.push(newItem);
            return true;
        }
    }

    // Removes an item from the project
    removeItem(item) {
        const index = this.items.indexOf(item);
        this.items.splice(index, 1);
    }
}

// Contains the list of all projects
// All methods are static so that it is essentially a singleton
class ProjectList {
    static #Projects = [];

    static get projectList() {
        return this.#Projects;
    }

    // Gets the project at a specified index
    static getProjectAt(index) {
        return this.#Projects[index];
    }

    // Gets the project with a specified name
    static getProjectByName(name) {
        return this.#Projects.find(project => project.title == name);
    }

    // Adds the specified project to the list
    static addProject(newProject) {
        if (this.#Projects.find(project => project.title === newProject.title)) {
            // Project is not unique, return false
            return false;
        } else {
            // Return index of new object
            this.#Projects.push(newProject);
            return this.#Projects.length - 1;
        }
    }

    // Removes the specified project from the list
    static removeProject(project) {
        // Cannot remove the 'all' project
        if (project.title == 'all') return;

        const index = this.#Projects.indexOf(project);
        if (index) this.#Projects.splice(index, 1);
    }

    // Adds item to specified project by project name
    static addItemByName(name, item) {
        const index = this.#Projects.findIndex(project => project.title == name);
        const result = this.#Projects[index].addItem(item);
        console.log(index);
        console.log(result);
        // Also add to all if the current project isn't all
        if (index != 0) {
            // store in second variable so function doesn't return twice
            const i = this.#Projects[0].addItem(item);
        }
        return result;
    }
}

module.exports = {Project, Item, ProjectList};