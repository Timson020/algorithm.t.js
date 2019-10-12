// random
function randomInt(max = 10, min = 0) {
	return Math.round(min + Math.random() * (max - min))
}

// 插入排序
// main
function sort(list) {
	for (let i = 1; i < list.length; i++) {
		for (let j = i; j > 0; j--) {
			if (list[j] < list[j - 1]) {
				const temp = list[j]
				list[j] = list[j - 1]
				list[j - 1] = temp
			} else {
				break	
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
