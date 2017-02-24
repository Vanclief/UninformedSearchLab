const Node = require('./node');
const Queue = require('../lib/queue');

function tree(data) {
	var node = new Node(data);
	this._root = node;
}

tree.prototype.traverseDF = function(callback) {

	// this is a recurse and immediately-invoking function
	(function recurse(currentNode) {
		// step 2
		for (var i = 0, length = currentNode.children.length; i < length; i++) {
			// step 3
			recurse(currentNode.children[i]);
		}

		// step 4
		callback(currentNode);

		// step 1
	})(this._root);

};

tree.prototype.traverseBF = function(callback) {
	var queue = new Queue();

	queue.add(this._root);

	currentTree = queue.remove();

	while (currentTree) {
		for (var i = 0, length = currentTree.children.length; i < length; i++) {
			queue.add(currentTree.children[i]);
		}

		callback(currentTree);
		currentTree = queue.remove();
	}
};

tree.prototype.contains = function(callback, traversal) {
	traversal.call(this, callback);
};

tree.prototype.add = function(data, toData, traversal) {
	var child = new Node(data),
		parent = null,
		callback = function(node) {
			if (node.data === toData) {
				parent = node;
			}
		};

	this.contains(callback, traversal);

	if (parent) {
		parent.children.push(child);
		child.parent = parent;
	} else {
		throw new Error('Cannot add node to a non-existent parent.');
	}
};

tree.prototype.remove = function(data, fromData, traversal) {
	var tree = this,
		parent = null,
		childToRemove = null,
		index;

	var callback = function(node) {
		if (node.data === fromData) {
			parent = node;
		}
	};

	this.contains(callback, traversal);

	if (parent) {
		index = findIndex(parent.children, data);

		if (index === undefined) {
			throw new Error('Node to remove does not exist.');
		} else {
			childToRemove = parent.children.splice(index, 1);
		}
	} else {
		throw new Error('Parent does not exist.');
	}

	return childToRemove;
};

function findIndex(arr, data) {
	var index;

	for (var i = 0; i < arr.length; i++) {
		if (arr[i].data === data) {
			index = i;
		}
	}

	return index;
}


module.exports = tree;
