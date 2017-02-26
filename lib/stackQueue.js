const LinkedList = require('./linkedList');

function StackQueue() {
  this.list = new LinkedList();
  this.length = 0;
}

function push(data) {
  this.list.add(data);
  this.length++;
}

StackQueue.prototype.pop() {
  if (this.isEmpty()) {
    throw new Error('The stack/queue is empty');
  }

  const results = this.peek();

  this.list.remove(results);
  this.length--;
  return results;
}

StackQueue.prototype.isEmpty() {
  return this.length === 0;
}

StackQueue.prototype.clear() {
  this.list = new LinkedList();
  this.length = 0;
}

StackQueue.prototype.peek() {
  return this.isEmpty() ? null : this.getNext();
}

module.exports = StackQueue;
