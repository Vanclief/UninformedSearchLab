var readline = require('readline');
const Stack = require('./lib/stack');
const Queue = require('./lib/queue');
const BinaryHeap = require('./lib/binaryHeap');
const Crane = require('./models/crane');
const State = require('./models/state');

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
var movements = [];
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

  console.log('Max Height:', maxHeight);
  console.log('Initial State:', init);
  console.log('Goal State:', goal);

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
  console.log(movements.join('; '));
}

function heuristic(node, goal, currentCost) {
  return state.getNumberMisplacedStacks(node, goal, currentCost);
}


function astar(node, goal) {

  var currentCost = 0;

  var heap = new BinaryHeap(function(node) {
    return heuristic(node, goal, currentCost);
  });

  heap.push(node);

  while (heap.size() > 0) {

    node = heap.pop();
    console.log(node, heuristic(node, goal, currentCost));

    if (state.compare(node, goal)) {
      return true;
    }

    visited.push(node);

    var children = crane.nextValidStates(node);

    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (!visitedContains(child)) {
        cost += crane.getCostForAction(node, child);
        var currentCost = cost;
        movements.push(crane.getActions(node, child));
        heap.push(child);
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
