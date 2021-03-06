// random
function randomInt(max = 10, min = 0) {
	return Math.round(min + Math.random() * (max - min))
}

// 冒泡排序
// main
function sort(list) {
	for (let i = 0; i < list.length; i++) {
		for (let j = i + 1; j < list.length; j++) {
			if (list[j] < list[i]) {
				const tmp = list[i]
				list[i] = list[j]
				list[j] = tmp
			}
		}
	}

	return list
}

// test
(function () {
	const list = []

	for (let i = 0; i < 1000000; i++) {
		list.push(randomInt(1000000, -1500))
	}

	console.time('sort')
	const res = sort(list)
	// console.info(res)
	console.timeEnd('sort')
})()
