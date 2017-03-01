const Crane = require('./crane');

var crane = new Crane();

function Node(state, parent) {
  this.state = state;
  this.parent = parent;
  if (parent) {
    this.cost = crane.getCostForAction(parent.state, state) +
      parent.cost;
  } else {
    this.cost = 0;
  }
  (parent) ? this.action = crane.getActions(parent.state, state): this.action = null;
}

Node.prototype.print = function() {

  console.log('---');
  if (this.parent)
    console.log('Parent:', this.parent.state);
  console.log('State:', this.state);
  console.log('Cost:', this.cost);
  if (this.parent)
    console.log('P. Cost:', this.parent.cost);
  console.log('Action:', this.action);

}

module.exports = Node;
