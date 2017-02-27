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

  // testHeap(init);

  if (!astar(init, goal)) {
    console.log('No solution found');
  } else {
    console.log(cost);
    printMovements();
  }
  //
  //
 }

function testHeap(init) {
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


function astar(node, goal) {

  var heap = new BinaryHeap(function(x) {
    return state.getNumberMisplacedStacks(x, goal);
  });

  heap.push(node);

  console.log('Heap size', heap.size());

  while (heap.size() > 0) {

    node = heap.pop();
    console.log('Heap size after pop', heap.size());

    console.log('--Searching with Node--');
    console.log(node);

    if (state.compare(node, goal)) {
      console.log('--Goal Found--');
      console.log(goal);
      return true;
    }

    visited.push(node);
    console.log('--Visited Nodes--');
    console.log(visited);

    var children = crane.nextValidStates(node);
    console.log('--Posible Actions--');
    console.log(children);

    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (!visitedContains(child)) {
        cost += crane.getCostForAction(node, child);
        movements.push(crane.getActions(node, child));
        heap.push(child);
      }
    }

  }
}

function depthFirstSearch(node, goal) {

  // console.log('--Searching with Node--');
  // console.log(node);


  visited.push(node);

  // console.log('--Visited Nodes--');
  // console.log(visited);

  if (state.compare(node, goal)) {
    // console.log('--Goal Found--');
    // console.log(goal);
    return true;
  }

  var i, j, child, found;
  var children = crane.nextValidStates(node);
  // console.log('--Posible Actions--');
  // console.log(children);

  for (i = 0; i < children.length; i++) {
    child = children[i];

    if (!visitedContains(child)) {
      cost += crane.getCostForAction(node, child);
      movements.push(crane.getActions(node, child));
      found = depthFirstSearch(child, goal);
      if (found) {
        return found;
      }
    }
  }

}

function breathFirstSearch(node, goal) {

  queue.push(node);

  while (queue.length > 0) {

    node = queue.pop();

    console.log('--Searching with Node--');
    console.log(node);

    if (state.compare(node, goal)) {
      console.log('--Goal Found--');
      console.log(goal);
      return true;
    }

    visited.push(node);
    console.log('--Visited Nodes--');
    console.log(visited);

    var children = crane.nextValidStates(node);
    console.log('--Posible Actions--');
    console.log(children);

    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (!visitedContains(child)) {
        cost += crane.getCostForAction(node, child);
        movements.push(crane.getActions(node, child));
        queue.push(child);
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
