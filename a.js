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
	let root = crane.nextValidStates(initialState);
	let init = crane.parseState(initialState);
	let goal = crane.parseState(goalState);

	console.log('MaxHeight:', maxHeight);
	console.log('initialState:', init);
	console.log('goalState:', goal);

	console.log(compareStacks(init, goal));
	// console.log(depthFirstSearch(root, goal));

}

function compareStacks(state, goal) {

	let result = true;

	if (!goal[0].includes('X')) {
		result = JSON.stringify(state[0]) == JSON.stringify(goal[0]);
	}
	if (!goal[1].includes('X')) {
		result = JSON.stringify(state[1]) == JSON.stringify(goal[1]);
	}
	if (!goal[2].includes('X')) {
		result = JSON.stringify(state[2]) == JSON.stringify(goal[2]);
	}

	return result;
}

function depthFirstSearch(root, goal) {



}
