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

	/*
	 * 获取链头
	 */
	getRoot() {
		return this.head
	}

	/*
	 * 获取链长度
	 */
	getLength() {
		return this.count
	}

	/*
	 * 获取链尾
	 */
	getLastNode() {
		return this.lastNode
	}

	/*
	 * 从末尾添加节点
	 */
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

	/*
	 * 删除指定节点
	 */
	removeAt(index = 0) {
		if (index === 0) {
			const _robot = this.getRoot()
			if (_robot) {
				const _nextRoot = _robot ? _robot.next : null
				// 删除需要删除节点的后续
				_robot.next = null

				// 删除后续的前驱
				if (_nextRoot) _nextRoot.pre = null

				this.head = _nextRoot
				--this.count
				return _robot
			}
			return null
		}

		const _item = this.getElementAt(index)
		if (_item) {
			const _preItem = _item.pre
			const _nextItem = _item.next
			// 删除需要删除节点的 前驱 后续
			_item.pre = null
			_item.next = null

			// 修改前驱的后续
			// 修改后续的前驱
			_preItem.next = _nextItem
			// 如果存在后续的话 就等于 删除元素不是最后一个
			// 否则就是最后元素指向删除元素的前驱
			_nextItem ? _nextItem.pre = _preItem : this.lastNode = _preItem
			--this.count
			return _item
		}
		return null
	}

	/*
	 * 获取指定节点
	 */
	getElementAt(index = 0) {
		const _count = this.getLength()
		if (index < 0 || _count < index) return null
		if (index === 0) return this.getRoot()
		return index < parseInt(_count / 2) ? this.__getElementByHead__(index) : this.__getElementByFood__(index)
	}

	/*
	 * 序列化
	 */
	toString() {
		let _currentEl = this.head
		let _objStr = `${this.__getElementString__(_currentEl)}`

		for (let i = 1; i < this.count; i++) {
			_currentEl = _currentEl.next
			if (_currentEl) {
				_objStr += `||${this.__getElementString__(_currentEl)}`
			} else {
				return _objStr
			}
		}
		return _objStr
	}

	/*
	 * __xxx___ 的函数为自身调用函数，不推荐外部使用
	 * 从头部开始搜索节点
	 */
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

	/*
	 * __xxx___ 的函数为自身调用函数，不推荐外部使用
	 * 从尾部开始搜索节点
	 */
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

	/*
	 *
	 */
	__getElementString__(node = {}) {
		return JSON.stringify(node.el)
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
console.info(link.toString())
console.info(link.removeAt(5))
console.info(link)
console.info(link.toString())

