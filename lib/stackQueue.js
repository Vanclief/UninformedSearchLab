const LinkedList = require('./linkedList');

function StackQueue() {
  this.list = new LinkedList();
  this.length = 0;
}

StackQueue.prototype.push = function(data) {
  this.list.add(data);
  this.length++;
}

StackQueue.prototype.pop = function() {
  if (this.isEmpty()) {
    throw new Error('The stack/queue is empty');
  }

  const results = this.peek();

  this.list.remove(results);
  this.length--;
  return results;
}

StackQueue.prototype.isEmpty = function() {
  return this.length === 0;
}

StackQueue.prototype.clear = function() {
  this.list = new LinkedList();
  this.length = 0;
}

StackQueue.prototype.peek = function() {
  return this.isEmpty() ? null : this.getNext();
}

module.exports = StackQueue;
