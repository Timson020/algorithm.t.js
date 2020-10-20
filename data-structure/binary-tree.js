// ES6
class Node {
	constructor(value) {
		this.key = value
		this.right = null
		this.left = null
	}
}

export default class Binary {
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

	static findMin(node) {
		let n = node
		if (!n) return null
		while (n.left) {
			n = n.left
		}
		return n
	}

	static findMax(node) {
		let n = node
		if (!n) return null
		while (n.right) {
			n = n.right
		}
		return n
	}

	static findNode(rootNode, node) {
		if (rootNode.key == node.key) return true

		if (rootNode.right && rootNode.key < node.key) return Binary.findNode(rootNode.right, node)

		if (rootNode.left && rootNode.key > node.key) return Binary.findNode(rootNode.left, node)

		return false
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

	min() {
		return Binary.findMin(this.tree)
	}

	max() {
		return Binary.findMax(this.tree)
	}

	find(node) {
		return Binary.findNode(this.tree, node)
	}
}

// 校验生成二叉树
function newDate() {
	const tree = new Binary()

	const list = [ 5, 56, 57, 89, 123, 1, 30, 6, 0 ]

	list.forEach(it => tree.insert(it))

	console.info(tree)
	if (global) global._tree = tree

	doInOrderTraversal()
	console.info('中序遍历完成')

	doPreOrderTraversal()
	console.info('前序遍历完成')

	
	doPostOrderTraversal()
	console.info('后序遍历完成')

	console.info(`查找出最小值是: ${global._tree.min().key}`)

	console.info(`查找出最大值是: ${global._tree.max().key}`)

	console.info(`查找出9的值是: ${global._tree.find(new Node(9))}`)

	console.info(`查找出6的值是: ${global._tree.find(new Node(6))}`)
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

