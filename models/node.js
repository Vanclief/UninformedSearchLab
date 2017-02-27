const Crane = require('./crane');

var crane = new Crane();

function node(state, parent) {
    this.state = state;
    this.parent = parent;
    (parent) ? this.cost = crane.getCostForAction(state, parent.state) : this.cost = null;
    (parent) ? this.action = crane.getActions(state, parent.state) : this.action = null;
    this.children = [];
}

module.exports = node;
