function state() {}

function parse(string) {

  var stacks = [];
  var arr = string.replace(/[( )]/g, '').split(';');

  stacks.push(arr[0].split(',').filter(Boolean));
  stacks.push(arr[1].split(',').filter(Boolean));
  stacks.push(arr[2].split(',').filter(Boolean));

  return stacks;
}

function compare(stackA, stackB) {

  var result = true;

  for (var i = 0; i <= 2; i++) {

    if (typeof stackA[i] != 'undefined' &&
        typeof stackB[i] != 'undefined' &&
        !stackB[i].includes('X'))
    {
      result = JSON.stringify(stackA[0]) == JSON.stringify(stackB[0]);
    }
  }
  return result;
}

state.prototype = {
  parse,
  compare
}

module.exports = state;
