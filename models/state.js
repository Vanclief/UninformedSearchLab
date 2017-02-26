function state() {}

state.prototype.parse = function(string) {

  var stacks = [];
  var arr = string.replace(/[( )]/g, '').split(';');

  stacks.push(arr[0].split(',').filter(Boolean));
  stacks.push(arr[1].split(',').filter(Boolean));
  stacks.push(arr[2].split(',').filter(Boolean));

  return stacks;
}

state.prototype.compare = function (stackA, stackB) {

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

module.exports = state;
