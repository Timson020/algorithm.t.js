class Node {
	constructor(el) {
		this.el = el
		this.next = null
	}
}

export default class LinkedList {
	constructor() {
		this.head = null
		this.lastNode = null
		this.length = 0
	}

	/*
	 * 获取链表头
	 */
	root() {
		return this.head
	}

	/*
	 * 获取列表长度
	 */
	length() {
		return this.length
	}

	/*
	 * 获取链表尾
	 */
	lastNode() {
		return this.lastNode
	}

	/*
	 * 给链表插入元素
	 */
	push(el = {}) {
		const _node = new Node(el)
		if (this.head) {
			this.lastNode.next = _node
		} else {
			this.head = _node
		}
		this.length++
		this.lastNode = _node
	}

	/*
	 * 查询索引位置的元素
	 */
	getElementAt(index = 0) {
		if (index >= 0 && this.length >= index) {
			let _currentEl = this.head
			for (let i = 0; i < index; i++) {
				_currentEl = _currentEl.next
				if (!_currentEl) return undefined
			}
			return _currentEl
		}
		return undefined
	}

	/*
	 * 查询某个节点
	 */
	find(item = {}) {

	}
}

