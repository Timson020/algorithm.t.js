const Link = require('../data-structure/unidirectional-linked-list')

console.info('----------start----------')

function deleteDuplicates(link = new Link()) {
	const _rootNode = link.getRoot()
	// 生成一个自己的链头节点
	let _cur = Link.newNode({})
	// 记录需要删除的节点高度
	let _index = 0
	if (!_rootNode) return true
	_cur.next = _rootNode

	while (_cur.next && _cur.next.next) {
		const _curEl = _cur.next.el
		let _nextNode = _cur.next.next
		let _delCount = 0

		// 对比当前next节点的value 和 next next节点的value
		while (_nextNode && _curEl === _nextNode.el) {
			_delCount === 0 ? _delCount += 2 : ++_delCount
			_nextNode = _nextNode.next
		}

		console.info('----------')
		console.info(`对比值：${_curEl}`)
		console.info(`删除条数：${_delCount}`)

		for (let i = 0; i < _delCount; i++) {
			console.info(`---删除索引---：${_index}`)
			console.info(link.removeAt(_index))
		}

		if (_delCount === 0) {
			++_index
			_cur = _cur.next
		} else {
			_cur.next = _nextNode
		}
		console.info('\n')
	}
	return true
}

const link = new Link()

link.push(0)
link.push(0)
link.push(1)
link.push(1)
link.push(1)
link.push(2)
link.push(2)
link.push(3)
link.push(4)
link.push(4)
link.push(5)

console.info(deleteDuplicates(link))
console.info(link.toString())
