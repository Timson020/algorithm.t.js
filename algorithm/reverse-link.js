const Link = require('../data-structure/unidirectional-linked-list')

// 反转节点
function reverse(link) {
	let _cur = link.getRoot()
	let _pre = null

	while (_cur) {
		const _next = _cur.next
		_cur.next = _pre

		_pre = _cur
		_cur = _next
	}
	return _pre
}

// 反转链表
function reverseLink(link) {
	link.head = reverse(link)
}

const link = new Link()
link.push(0)
link.push(1)
link.push(2)
link.push(3)
link.push(4)
link.push(5)

console.info(link.toString())
reverseLink(link)
console.info(link.toString())

