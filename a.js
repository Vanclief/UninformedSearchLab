var readline = require('readline');
const Stack = require('./lib/stack');
const Queue = require('./lib/queue');
const BinaryHeap = require('./lib/binaryHeap');
const Crane = require('./models/crane');
const State = require('./models/state');
const Node = require('./models/node');

// Create interface for STDIO
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var maxHeight, initialState, goalState;
var inputCount = 1; // Counter for input

var crane;
var state = new State();

var visitedNodes = [];
var queue = new Queue();
var movements = new Stack();
var cost = 0;

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
      main(maxHeight, initialState, goalState);
      break;
    default:
      console.log('Exceeded input')
      break;
  }
})

function main(maxHeight, initialState, goalState) {

  var init = state.parse(initialState);
  var goal = state.parse(goalState);
  crane = new Crane(maxHeight);

  if (!astar(init, goal)) {
    console.log('No solution found');
  } else {
    console.log(cost);
    state.printMovements(movements);
  }
}

function heuristic(node, goal, currentCost) {
  return state.getNumberMisplacedBlocks(node, goal);
}


function astar(init, goal) {

  var currentCost = 0;

  var node = new Node(init, null)

  var heap = new BinaryHeap(function(node) {
    return heuristic(node.state, goal, currentCost) + node.cost;
  });

  heap.push(node);

  while (heap.size() > 0) {

    node = heap.pop();

    if (state.compare(node.state, goal)) {
      cost = node.cost;
      while (node.parent) {
        movements.push(node);
        node = node.parent;
      }
      return true;
    }

    visitedNodes.push(node.state);

    var children = crane.nextValidStates(node.state);

    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (!state.visitedContains(visitedNodes, child)) {
        var currentCost = node.cost;
        var newNode = new Node(child, node);
        heap.push(newNode);
      }
    }
  }
}


