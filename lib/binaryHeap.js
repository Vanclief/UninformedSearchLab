// Ok honestly this isnt a binaryHeap, its more like if a binaryHeap and a priorityQueue had a kid.
function BinaryHeap(scoreFunction) {
  this.content = [];
  this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
  push: function(element) {
    this.content.push(element);
  },

  pop: function() {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it sink down.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    return result;
  },

  size: function() {
    return this.content.length;
  },

  sort: function(n) {
    var element = this.content[n],
      score = this.scoreFunction(element);
  },

  sinkDown: function(n) {
    var length = this.content.length,
      element = this.content[n],
      elemScore = this.scoreFunction(element);

    while (true) {
      var child2N = (n + 1) * 2,
        child1N = child2N - 1;
      var swap = null;
      if (child1N < length) {
        var child1 = this.content[child1N],
          child1Score = this.scoreFunction(child1);
        if (child1Score < elemScore)
          swap = child1N;
      }
      if (child2N < length) {
        var child2 = this.content[child2N],
          child2Score = this.scoreFunction(child2);
        if (child2Score < (swap == null ? elemScore : child1Score))
          swap = child2N;
      }

      if (swap == null) break;

      this.content[n] = this.content[swap];
      this.content[swap] = element;
      n = swap;
    }
  }
};
module.exports = BinaryHeap;
