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
    addItem(item) {
        this.items.push(item);
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

    // Adds the specified project to the list
    static addProject(newProject) {
        let contains = false;
        this.#Projects.forEach(project => {
            if (project.title == newProject.title) contains = true;
        });
        // If contains was set, insert failed and return here
        if (contains) return false;

        // Otherwise, insert the project and reuturn the new length
        this.#Projects.push(project);
        return this.#Projects.length-1;
    }

    // Removes the specified project from the list
    static removeProject(project) {
        // Cannot remove the 'all' project
        if (project.title == 'all') return;

        const index = this.#Projects.indexOf(project);
        this.#Projects.splice(index, 1);
    }

    // Gets the project at a specified index
    static getProjectAt(index) {
        return this.#Projects[index];
    }
}

module.exports = {Project, Item, ProjectList};