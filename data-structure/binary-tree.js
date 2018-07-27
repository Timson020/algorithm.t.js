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

	static inOrderTraversalNode(node, cb) {
		if (!node) return
		Binary.inOrderTraversalNode(node.left, cb)
		cb(node.key)
		Binary.inOrderTraversalNode(node.right, cb)
	}

	static preOrderTraversalNode(node, cb) {
		if (!node) return
		cb(node.key)
		Binary.preOrderTraversalNode(node.left, cb)
		Binary.preOrderTraversalNode(node.right, cb)
	}

	static postOrderTraversalNode(node, cb) {
		if (!node) return
		Binary.postOrderTraversalNode(node.left, cb)
		Binary.postOrderTraversalNode(node.right, cb)	
		cb(node.key)
	}

	insert(value) {
		const node = new Node(value)

		!this.tree ? this.tree = node : Binary.insertNode(this.tree, node)
	}

	inOrderTraversal(cb) {
		Binary.inOrderTraversalNode(this.tree, cb)
	}

	preOrderTraversal(cb) {
		Binary.preOrderTraversalNode(this.tree, cb)
	}

	postOrderTraversal(cb) {
		Binary.postOrderTraversalNode(this.tree, cb)	
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

// 	this.inOrderTraversal = function(cb) {
// 		inOrderTraversalNode(root, cb)
// 	}

// 	this.preOrderTraversal = function(cb) {
// 		preOrderTraversalNode(root, cb)
// 	}

// 	this.postOrderTraversal = function(cb) {
// 		postOrderTraversalNode(root, cb)
// 	}

// 	function insertNode(rootNode, node) {
// 		if ((node.key < rootNode.key) && !rootNode.left) rootNode.left = node
		
// 		if ((node.key < rootNode.key) && rootNode.left) insertNode(rootNode.left, node)

// 		if ((node.key > rootNode.key) && !rootNode.right) rootNode.right = node

// 		if ((node.key > rootNode.key) && rootNode.right) insertNode(rootNode.right, node)
// 	}

// 	function inOrderTraversalNode(node, cb) {
// 		if (!node) return
// 		inOrderTraversalNode(node.left, cb)
// 		cb(node.key)
// 		inOrderTraversalNode(node.right, cb)
// 	}

// 	function preOrderTraversalNode(node, cb) {
// 		if (!node) return
// 		cb(node.key)
// 		preOrderTraversalNode(node.left, cb)
// 		preOrderTraversalNode(node.right, cb)	
// 	}

// 	function postOrderTraversalNode(node, cb) {
// 		if (!node) return
// 		postOrderTraversalNode(node.left, cb)
// 		postOrderTraversalNode(node.right, cb)
// 		cb(node.key)
// 	}
// }


// 校验生成二叉树
function newDate() {
	const tree = new Binary()

	const list = [5,56,57,89,123,1,30,6,0]

	list.forEach(it => tree.insert(it))

	console.info(tree)
	if (global) global._tree = tree

	doInOrderTraversal()
	console.info('中序遍历完成')

	doPreOrderTraversal()
	console.info('前序遍历完成')

	
	doPostOrderTraversal()
	console.info('后序遍历完成')
}

// 执行中序遍历
function doInOrderTraversal() {
	if (global._tree) global._tree.inOrderTraversal((value) => console.info(value))
}

// 执行前序遍历
function doPreOrderTraversal() {
	if (global._tree) global._tree.preOrderTraversal((value) => console.info(value))
}

// 执行后续遍历
function doPostOrderTraversal() {
	if (global._tree) global._tree.postOrderTraversal((value) => console.info(value))	
}

newDate()


