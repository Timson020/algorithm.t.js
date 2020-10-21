class Node {
	constructor(el) {
		this.el = el
		this.next = null
	}
}

export default class LinkedList {
	constructor(nodeStr) {
		const _nodeStr = nodeStr || ''
		const _strList = _nodeStr.split('||').filter(it => it)
		this.head = null
		this.lastNode = null
		this.count = 0

		this.__init__(_strList)
	}

	__init__(list = []) {
		for (let i = 0; i < list.length; i++) {
			const _item = list[i]
			try {
				const _el = JSON.parse(_item)
				this.push(_el)
			} catch (error) {
				console.error(`${_item} is error node el`)
			}
		}
	}

	/*
	 * 获取链表头
	 */
	getRoot() {
		return this.head
	}

	/*
	 * 获取列表长度
	 */
	getLength() {
		return this.count
	}

	/*
	 * 获取链表尾
	 */
	getLastNode() {
		return this.lastNode
	}

	/*
	 * 给链表插入节点
	 */
	push(el = {}) {
		const _node = new Node(el)
		if (this.head) {
			this.lastNode.next = _node
		} else {
			this.head = _node
		}
		this.count++
		this.lastNode = _node
		return this.getLastNode()
	}

	/*
	 * 查询索引位置的节点
	 */
	getElementAt(index = 0) {
		if (index >= 0 && this.getLength() >= index) {
			let _currentEl = this.getRoot()
			for (let i = 1; i <= index; i++) {
				_currentEl = _currentEl.next
				if (!_currentEl) return null
			}
			return _currentEl
		}
		return null
	}

	/*
	 * 删除节点
	 */
	removeAt(index = 0) {
		if (index < 0 || index > this.getLength()) return null
		if (index === 0) return this.removeHead()
		const _preEl = this.getElementAt(index - 1)
		const _currentEl = _preEl ? _preEl.next : null
		if (!_preEl) return null
		_preEl.next = _currentEl ? _currentEl.next : null
		if ((index + 1) === this.getLength()) this.lastNode = _preEl.next || _preEl
		--this.count
		delete _currentEl.next
		return _currentEl
	}

	/*
	 * 删除root节点
	 */
	removeRoot() {
		const _currentEl = this.head
		if (!_currentEl) return null
		this.head = _currentEl.next || null
		--this.count
		delete _currentEl.next
		return _currentEl
	}

	/*
	 * 向指定长度插入节点
	 */
	insert(index = 0, el = {}) {
		if (index < 0 || index > this.getLength()) return null
		if (index === 0) return this.insertRoot(el)
		const _el = new Node(el)
		const _preEl = this.getElementAt(index - 1)
		_el.next = _preEl.next
		_preEl.next = _el
		++this.count
		return _el
	}

	/*
	 * 向头部插入节点
	 */
	insertRoot(el = {}) {
		const _el = new Node(el)
		const _currentEl = this.getRoot()
		_el.next = _currentEl
		this.head = _el
		++this.count
		return _el
	}

	/*
	 * 序列化
	 */
	toString() {
		let _currentEl = this.head
		let _objStr = `${this.getElementString(_currentEl)}`

		for (let i = 1; i < this.count; i++) {
			_currentEl = _currentEl.next
			if (_currentEl) {
				_objStr += `||${this.getElementString(_currentEl)}`
			} else {
				return _objStr
			}
		}
		return _objStr
	}

	/*
	 *
	 */
	getElementString(node = {}) {
		return JSON.stringify(node.el)
	}
}

function splitLog() {
	console.info('-----split link-----')
}

const linkList = new LinkedList()
linkList.push({ name: 'root', customDate: 1100 })
linkList.push({ name: '1', customProps: 1021 })
linkList.push({ name: '2', customProps: 9999 })
linkList.push({ name: '3', customDate: 890 })


linkList.insert(3, { name: 'test', customDate: 32190 })
linkList.removeAt(2)
splitLog()
console.info(linkList.getElementAt(0))
splitLog()
console.info(linkList.getElementAt(1))
splitLog()
console.info(linkList.getElementAt(2))
splitLog()
console.info(linkList.getElementAt(3))
splitLog()
console.info(linkList.getElementAt(4))
splitLog()
console.info(linkList.toString())
splitLog()
console.info(new LinkedList(linkList.toString()))

