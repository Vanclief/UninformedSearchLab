function node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}

module.exports = node;
