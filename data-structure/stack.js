// ES6
class Stack {
	constructor() {
		this.data = []
	}

	// 入栈
	push(item) {
		this.data.push(item)
	}

	// 出栈
	pop() {
		return this.data.pop()
	}

	// 查看最后一个元素
	peek() {
		const { length } = this.data
		return this.data[length - 1]
	}

	// 栈是否为空
	isEmpty() {
		return this.data.length === 0
	}

	// 栈的长度
	size() {
		return this.data.length
	}

	// 清除栈
	clear() {
		this.data = []
	}

	// 格式化栈
	toString(p) {
		return this.data.join(p || ' ')
	}
}

module.exports = Stack

