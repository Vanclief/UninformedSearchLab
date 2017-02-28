const Crane = require('./crane');

var crane = new Crane();

function Node(state, parent) {
  this.state = state;
  this.parent = parent;
  if (parent) {
    this.cost = crane.getCostForAction(state, parent.state) +
      parent.cost;
  } else {
    this.cost = 0;
  }
  (parent) ? this.action = crane.getActions(state, parent.state): this.action = null;
}

Node.prototype.print = function() {

  console.log('---');
  if (this.parent)
    console.log('Parent:', this.parent.state);
  console.log('State:', this.state);
  console.log('Cost:', this.cost);
  console.log('Action:', this.action);

}

module.exports = Node;
