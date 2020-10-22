class Node {
	constructor(el) {
		this.el = el
		this.pre = null
		this.next = null
	}
}

class BilateralLink {
	constructor() {
		this.head = null
		this.lastNode = null
		this.count = 0
	}

	getRoot() {
		return this.head
	}

	getLength() {
		return this.count
	}

	getLastNode() {
		return this.lastNode
	}

	push(element = {}) {
		const _el = new Node(element)
		this.lastNode ? this.lastNode.next = _el : null
		_el.pre = this.lastNode
		this.lastNode = _el
		++this.count
		if (!this.getRoot()) {
			this.head = _el
			return this.getRoot()
		}
		return this.getLastNode()
	}

	getElementAt(index = 0) {
		if (index < 0 || this.getLength() < index) return null
		if (index === 0) return this.getRoot()
		const _count = this.getLength()
		return index < parseInt(_count / 2) ? this.__getElementByHead__(index) : this.__getElementByFood__(index)
	}

	__getElementByHead__(index = 0) {
		let _index = 1
		let _currentEl = this.getRoot()
		_currentEl = _currentEl ? _currentEl.next : null
		while(_index < index) {
			if (!_currentEl.next) return null
			_currentEl = _currentEl.next
			++_index
		}
		return _currentEl
	}

	__getElementByFood__(index = 0) {
		const _count = this.getLength()
		let _index = _count - 1
		let _currentEl = this.getLastNode()
		if (index === (_count - 1)) return _currentEl
		if (!_currentEl) return null
		while (_index > index) {
			if (!_currentEl.pre) return null
			_currentEl = _currentEl.pre
			--_index
		}
		return _currentEl
	}
}

const link = new BilateralLink()

link.push({ name: 'root' })
link.push({ name: '1' })
link.push({ name: '2' })
link.push({ name: '3' })
link.push({ name: '4' })
link.push({ name: '5' })

console.info(link)
console.info(link.getElementAt(0).el)
console.info(link.getElementAt(1).el)
console.info(link.getElementAt(2).el)
console.info(link.getElementAt(3).el)
console.info(link.getElementAt(4).el)
console.info(link.getElementAt(5).el)

