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

var visited = [];
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

  // testHeap(init, goal);

  if (!astar(init, goal)) {
    console.log('No solution found');
  } else {
    console.log(cost);
    printMovements();
  }
  //
  //
}

function testHeap(init, goal) {
  var nextValidStates = crane.nextValidStates(init);
  var heap = new BinaryHeap(function(x) {
    return state.getNumberMisplacedStacks(x, goal);
  });

  for (var k = 0; k < nextValidStates.length; k++) {
    heap.push(nextValidStates[k]);
  }

  console.log('Pop States --');

  while (heap.size() > 0) {
    var x = heap.pop();
    console.log(x, state.getNumberMisplacedStacks(x, goal));
  }
}


function printMovements() {
  var arr = [];

  while (movements.length > 0) {
    arr.push(movements.pop());
  }
  console.log(arr.join('; '));
}

function heuristic(node, goal, currentCost) {
  return state.getNumberMisplacedStacks(node, goal, currentCost);
  // return 0;
}


function astar(init, goal) {

  var currentCost = 0;

  var node = new Node(init, null)

  var heap = new BinaryHeap(function(node) {
    return heuristic(node.state, goal, currentCost) + node.cost;
  });

  heap.push(node);

  while (heap.size() > 0) {

    // console.log('--Heap BEFORE Pop --');
    // console.log(heap);
    node = heap.pop();
    // console.log('--Heap After Pop --');
    // console.log(heap);
    // node.print();

    if (state.compare(node.state, goal)) {
      cost = node.cost;
      while (node.parent) {
        // node.print();
        movements.push(node.action);
        node = node.parent;
      }
      return true;
    }

    visited.push(node.state);

    var children = crane.nextValidStates(node.state);
    // console.log('Posibilities:', children);

    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (!visitedContains(child)) {
        var currentCost = node.cost;
        var newNode = new Node(child, node);
        heap.push(newNode);
        // console.log('--Heap after push --');
        // console.log(heap);
      }
    }
  }
}

function visitedContains(stack) {

  result = false;

  for (j = 0; j < visited.length; j++) {
    // console.log('--VisitedContains--');
    // console.log('Checking:', stack);
    // console.log('Against', visited[j]);
    // console.log('Result:', state.compare(visited[j], stack));

    if (state.compare(visited[j], stack)) {
      result = true;
    }
  }

  return result;
}
