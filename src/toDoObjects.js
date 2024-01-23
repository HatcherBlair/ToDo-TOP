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
}

module.exports = {Project, Item};