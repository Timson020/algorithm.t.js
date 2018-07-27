// ES6
class Node {
	constructor(value) {
		this.key = value
		this.right = null
		this.left = null
	}
}

class Binary {
	constructor() {
		this.tree = null
	}

	static insertNode(rootNode, node) {
		if ((node.key < rootNode.key) && !rootNode.left) rootNode.left = node
		
		if ((node.key < rootNode.key) && rootNode.left) Binary.insertNode(rootNode.left, node)

		if ((node.key > rootNode.key) && !rootNode.right) rootNode.right = node

		if ((node.key > rootNode.key) && rootNode.right) Binary.insertNode(rootNode.right, node)
	}

	insert(value) {
		const node = new Node(value)

		!this.tree ? this.tree = node : Binary.insertNode(this.tree, node)
	}
}


// ES5
// function Binary() {
// 	let root = null
	
// 	const Node = function(value) {
// 		this.key = value
// 		this.left = null
// 		this.right = null
// 	}

// 	this.insert = function(value) {
// 		const node = new Node(value)
// 		!root ? root = node : insertNode(root, node)
// 	}

// 	function insertNode(rootNode, node) {
// 		if ((node.key < rootNode.key) && !rootNode.left) rootNode.left = node
		
// 		if ((node.key < rootNode.key) && rootNode.left) insertNode(rootNode.left, node)

// 		if ((node.key > rootNode.key) && !rootNode.right) rootNode.right = node

// 		if ((node.key > rootNode.key) && rootNode.right) insertNode(rootNode.right, node)
// 		console.info(root)
// 	}
// }


// 校验生成二叉树
function newDate() {
	const tree = new Binary()

	const list = [5,56,57,89,123,1,30,6,0]

	list.forEach(it => tree.insert(it))

	console.info(tree)

	this._tree = tree
}

newDate()
