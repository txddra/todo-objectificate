const readline = require('readline');
const fs = require('fs');


let todos = [];
const interface = readline.createInterface({input: process.stdin, output: process.stdout})
const menu = `
Your options are:

1. Add a todos.
2. Remove a todos.
3. Mark a todos completed.
4. Mark a todos uncompleted.
5. Quit.

`

const loadTodos = function() {
  // todos.splice(0);
  const file = fs.readFileSync(__dirname, './[todos.json]');
  const rows = file.split('\n');
  for (const rowString of rows) {
    const todos = rowString.split(',')
    todos.push(todos);
  }
}

const saveTodos = function() {
  const rowStrings = [];
  for (const todos of todos) {
    rowStrings.push(todos[0] + ',' + todos[1]);
  }

  const newContents = rowStrings.join('\n');
  fs.writeFileSync('./todos.csv', newContents);
}

const displayTodos = function(shouldPrintNumber) {
  console.log('\nHere are your current todos:\n')
  for (let i = 0; i < todos.length; i++) {
    const todos = todos[i];
    const text = todos[0];
    const isComplete = todos[1];
    const priority = todos[2];
    const num = i + 1;
    let listSymbol = '*';
    let mark = '✖';
    if (shouldPrintNumber) {
      listSymbol = num + '.';
    }

    if (isComplete === 'complete') {
      mark = '✅';
    }

    const todoLine = listSymbol + ' ' + text + ' - priority: ' + priority + ' - ' + mark;
    // or, using interpolation:
    // const todoLine = `${listSymbol} ${todos.text} - priority: ${todos.priority} - ${mark}`
    console.log(todoLine);
  }
}

const add = function(text) {
  const todos = [text, 'uncomplete'];
  todos.push(todos);
  saveTodos();
  displayTodos(false);
  interface.close();
}

const remove = function(num) {
  todos.splice(num - 1, 1);
  saveTodos();
  displayTodos(false);
  interface.close();
}

const complete = function(num) {
  [['thing1', 'complete'], ['thing2', 'uncomplete']]
  for (let i = 0; i < todos.length; i++) {
    if (i + 1 === Number(num)) {
      todos[i][1] = 'complete';
    }
  }

  saveTodos();
  displayTodos(false);
  interface.close();
}

const uncomplete = function(num) {
  for (let i = 0; i < todos.length; i++) {
    if (i + 1 === Number(num)) {
      todos[i][1] = 'uncomplete';
    }
  }

  saveTodos();
  displayTodos(false);
  interface.close();
}

const handleMenu = function(cmd) {
  if (cmd === '1') {
    // Add a todos.
    interface.question('\nWhat should go on your list? ', add)
  } else if (cmd === '2') {
    // Remove a todos.
    displayTodos(true);
    interface.question('\nPlease pick a todos to remove: ', remove)
  } else if (cmd === '3') {
    // Mark a todos complete.
    displayTodos(true);
    interface.question('\nPlease pick a todos to mark complete: ', complete)
  } else if (cmd === '4') {
    // Mark a todos complete.
    displayTodos(true);
    interface.question('\nPlease pick a todos to mark uncomplete: ', uncomplete)
  } else {
    console.log('Quitting!');
    interface.close();
  }
}

loadTodos();
displayTodos(false);
interface.question(menu, handleMenu);
