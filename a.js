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

// Input Variables
let maxHeight, initialState, goalState;
let inputCount = 1; // Counter for input
let crane;
let state = new State();

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

  console.log('Max Height:', maxHeight);
  console.log('Initial State:', init);
  console.log('Goal State:', goal);



  console.log('Next Valid States', crane.nextValidStates(init));
  depthFirstSearch(init, goal);

}


function depthFirstSearch(crane, root, goal) {


  if (state.compare(root, goal)) {
    return goal;
  }
  let i, child, found;
  console.log('root', root);
  let children = crane.nextValidStates(root);
  console.log('children', children);

  for (i = 0; i < children.length; i += 1) {
    child = children[i];
    found = depthFirstSearch(crane, child, goal);
    if (found) {
      return found;
    }
  }

}
