// ES6
class Queue {
	constructor() {
		this.data = []
	}

	// 入列
	enqueue(item) {
		this.data.push(item)
	}

	// 出列
	dequeue() {
		return this.data.shift()
	}

	// 查看第一个元素
	front() {
		return this.data[0]
	}

	// 查看最后一个元素
	back() {
		const { length } = this.data
		return this.data[length - 1]
	}

	// 队列是否为空
	isEmpty() {
		return this.data.length === 0
	}

	// 查看队列的长度
	size() {
		return this.data.length
	}

	// 格式化队列
	toString(p) {
		return this.data.join(p || ' ')
	}
}

module.exports = Queue

