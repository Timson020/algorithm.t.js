const PENDING = 'Pending'
const FULFILLED = 'Fulfilled'
const REJECTED = 'Rejected'

const root = typeof window === undefined ? global : window

function isFunction(func) {
	return typeof func === 'function'
}

function isMyPromise(fn) {
	return fn instanceof MyPromise
}

function isObject(data) {
	return data && (typeof data === 'object' || typeof data === 'function')
}

// 因为promise是微任务，我们尽可能的去模拟
const nextTick = (function() {
	if (typeof root.process === 'object' && isFunction(root.process.nextTick)) {
		// node环境
		return function(fn) {
			// process.nextTick 是微任务
			root.process.nextTick(fn)
		}
	} else {
		// 浏览器环境
		return function(fn) {
			// setTimeout 是宏任务
			root.setTimeout(fn, 0)
		}
	}
})()

// 将promise由中间态到终态
const promiseResolutionProcedure = function(promise, result, async = true) {
	if (promise === result) {
		/*
     * 因为promise 如果收到的value是一个promise会等待他的结果。
     * 所以如果接受到的value是本身就递归了。
     *
     * @see https://promisesaplus.com/ 2.3.1 条规定
     */
		return promise._reject(new TypeError('Chaining cycle detected for promise'))
	}

	// 如果接收到的是个promise
	if (isMyPromise(result)) {
		switch (result._state) {
		case FULFILLED: {
			nextTick(function() { promise._resolve(result._value) })
			break
		}
		case REJECTED: {
			nextTick(function() { promise._reject(result._reason) })
			break
		}
		case PENDING: {
			const _resolve = result._resolve
			const _reject = result._reject

			result._resolve = function(value) {
				_resolve.call(result, value)
				promise._resolve(value)
			}.bind(result)

			result._reject = function(reason) {
				_reject.call(result, reason)
				promise._reject(reason)
			}.bind(result)
			break
		}
		}
		return
	}

	// 如果接受到的是个thenable 对象
	if (isObject(result) && isFunction(result.then)) {
		/*
     * 多次调用只有第一次有效
     *
     * @see https://promisesaplus.com/ 2.3.3.3.3 条规定
     */
		let flag = false
		const _resolve = function(value) {
			if (flag) return
			flag = true
			promiseResolutionProcedure(promise, value)
		}
		const _reject = function(reason) {
			if (flag) return
			flag = true
			promise._reject(reason)
		}
		const thenTemp = function() {
			try {
				result.then(_resolve, _reject)
			} catch (error) {
				_reject(error)
			}
		}
		if (async) {
			nextTick(thenTemp)
		} else {
			thenTemp()
		}
		return
	}

	promise._resolve(result)
	return
}

class MyPromise {
	constructor(resolver) {
		if (!isFunction(resolver)) {
			throw new TypeError('Promise resolver undefined is not a function')
		}
		/** @type { PENDING | FULFILLED | REJECTED} */
		this._state = PENDING

		this._value = undefined
		this._reason = undefined

		this._isPromise = true

		/**
     * 因为同一个promise可以被then 多次。
     * 这里的多次不是指链式调用！！！！ 
     * 这里理解了好久TAT
     */ 
		this._resolveFnQueues = []
		this._rejectFnQueuse = []

		promiseResolutionProcedure(this, { then: resolver }, false)
	}

	_resolve(value) {
		if (this._state !== PENDING) return
		this._state = FULFILLED
		this._value = value
		if (this._resolveFnQueues.length) {
			nextTick(() => {
				this._resolveFnQueues.forEach(cb => cb(value))
				this._resolveFnQueues.length = 0
				this._rejectFnQueuse.length = 0
			})
		}
	}

	_reject(reason) {
		if (this._state !== PENDING) return
		this._state = FULFILLED
		this._reason = reason
		if (this._rejectFnQueuse.length) {
			nextTick(() => {
				this._rejectFnQueuse.forEach(cb => cb(reason))
				this._resolveFnQueues.length = 0
				this._rejectFnQueuse.length = 0
			})
		}
	}

	// then注册一个监听，在这个promise onFulfilled 或者 onRejected
	then(onFulfilled, onRejected) {
		onFulfilled = isFunction(onFulfilled) ? onFulfilled : MyPromise.resolve
		onRejected = isFunction(onRejected) ? onRejected : MyPromise.reject
		const chainPromise = new MyPromise(function() {})

		const nextOnFulfilled = function(value) {
			let result
			try {
				result = onFulfilled(value)
				promiseResolutionProcedure(chainPromise, result)
			} catch (error) {
				chainPromise._reject(error)
			}
		}

		const nextOnRejected = function(reason) {
			let result
			try {
				result = onRejected(reason)
				promiseResolutionProcedure(chainPromise, result)
			} catch (error) {
				chainPromise._reject(error)
			}
		}

		switch (this._state) {
		case FULFILLED: {
			nextTick(() => { nextOnFulfilled(this._value) })
			break
		}
		case REJECTED: {
			nextTick(() => { nextOnRejected(this._reason) })
			break
		}
		case PENDING: {
			this._resolveFnQueues.push(nextOnFulfilled)
			this._rejectFnQueuse.push(nextOnRejected)
		}
		}

		return chainPromise
	}

	catch(onRejected) {
		return this.then(undefined, onRejected)
	}

	toString() {
		switch (this._state) {
		case PENDING:
			return 'Promise { <pending> }'
		case FULFILLED:
			return 'Promise { ' + this._value + ' }'
		case REJECTED:
			return 'Promise { <rejected> ' + this._reason + ' }'
		}
	}

	static resolve(value) {
		return new MyPromise(resolve => resolve(value))
	}

	static reject(value) {
		return new MyPromise((resolve, reject) => reject(value))
	}
}

