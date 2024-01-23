const toDoObjects = require('./toDoObjects')

function makePage() {
    const testing = document.createElement('div');

    const testItem = new toDoObjects.Item('Test', 'Testing123', 'today', 5, 'No notes...');

    const testTitle = document.createElement('h5');
    testTitle.textContent = testItem.title;

    const testDescription = document.createElement('p');
    testDescription.textContent = testItem.description;

    const testDueDate = document.createElement('p');
    testDueDate.textContent = testItem.dueDate;

    const testPriority = document.createElement('p');
    testPriority.textContent = testItem.priority;

    const testNotes = document.createElement('p');
    testNotes.textContent = testItem.notes;

    testing.appendChild(testTitle);
    testing.appendChild(testDescription);
    testing.appendChild(testDueDate);
    testing.appendChild(testPriority);
    testing.appendChild(testNotes);

    const body = document.querySelector('body');

    body.appendChild(testing);
}

module.exports = {makePage};