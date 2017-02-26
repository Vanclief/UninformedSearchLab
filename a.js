let readline = require('readline');
const Stack = require('./lib/stack');
const Crane = require('./models/crane');
const State = require('./models/state');

// Create interface for STDIO
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let maxHeight, initialState, goalState;
let inputCount = 1; // Counter for input

let crane;
let state = new State();

let visited = [];
let movements = [];
let cost = 0;

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

  let init = state.parse(initialState);
  let goal = state.parse(goalState);
  crane = new Crane(maxHeight);

  // console.log('Max Height:', maxHeight);
  // console.log('Initial State:', init);
  // console.log('Goal State:', goal);

  // console.log('Next Valid States', crane.nextValidStates(init));

  if (!depthFirstSearch(init, goal)) {
    console.log('No solution found');
  } else {
    console.log(cost);
    printMovements();
  }

}

function printMovements() {
  console.log(movements.join('; '));
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

  let i, j, child, found;
  let children = crane.nextValidStates(node);
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
