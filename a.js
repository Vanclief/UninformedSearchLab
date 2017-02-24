// Import required for stdin
let readline = require('readline');

// Data Structure Imports
const Stack = require('./lib/stack');

// Model Imports
const Crane = require('./models/crane');
const Tree = require('./models/tree');
const Node = require('./models/node');

// Input Variables
let maxHeight;
let initialState;
let goalState;

// General variables
let inputCount = 1; // Counter for input


// Create interface for STDIO
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line) {

  switch (inputCount) {
    case 1:
      maxHeight = line;
      inputCount++;
      break;
    case 2:
      initialState = line;
      inputCount++;
      break;
    case 3:
      goalState = line;
      inputCount++;
      run(maxHeight, initialState, goalState);
      break;
    default:
      console.log('Exceeded input')
      break;
  }
})

function run(maxHeight, initialState, goalState) {

  const crane = new Crane(maxHeight, initialState, goalState);

  crane.nextValidStates(initialState);

  var tree = new Tree('one');

  tree._root.children.push(new Node('two'));
  tree._root.children[0].parent = tree;

  tree._root.children.push(new Node('three'));
  tree._root.children[1].parent = tree;

  tree._root.children.push(new Node('four'));
  tree._root.children[2].parent = tree;

  tree._root.children[0].children.push(new Node('five'));
  tree._root.children[0].children[0].parent = tree._root.children[0];

  tree._root.children[0].children.push(new Node('six'));
  tree._root.children[0].children[1].parent = tree._root.children[0];

  tree._root.children[2].children.push(new Node('seven'));
  tree._root.children[2].children[0].parent = tree._root.children[2];

  // initStackVariables(initialState);

  // tree.traverseDF(function(node) {
    // console.log(node.data)
  // });

  // console.log('------');

  // tree.traverseBF(function(node) {
    // console.log(node.data)
  // });
}

