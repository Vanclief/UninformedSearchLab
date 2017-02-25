
function state() {}

function parse(string) {

  let stacks = [];
  let arr = string.replace(/[( )]/g, '').split(';');

  stacks.push(arr[0].split(',').filter(Boolean));
  stacks.push(arr[1].split(',').filter(Boolean));
  stacks.push(arr[2].split(',').filter(Boolean));

  return stacks;
}

function compare(stackA, stackB) {

  let result = true;

  if (!stackB[0].includes('X')) {
    result = JSON.stringify(stackA[0]) == JSON.stringify(stackB[0]);
  }
  if (!stackB[1].includes('X')) {
    result = JSON.stringify(stackA[1]) == JSON.stringify(stackB[1]);
  }
  if (!stackB[2].includes('X')) {
    result = JSON.stringify(stackA[2]) == JSON.stringify(stackB[2]);
  }

  return result;
}

state.prototype = {
  parse,
  compare
}

module.exports = state;
