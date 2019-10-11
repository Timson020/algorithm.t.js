// random
function randomInt(max = 10, min = 0) {
	return Math.round(min + Math.random() * (max - min))
}

// 梳子排序
// main
function sort(list) {
	const gap = 1.3
	let bool = true
	let step = ~~(list.length / gap)

	do {
		for (let i = 0; step + i < list.length; i++) {
			if (list[i] > list[step + i]) {
				const temp = list[i]
				list[i] = list[step + i]
				list[step + i] = temp
			}
		}
		step = ~~(step / gap)
		if (step < 1) {
			step = 1
			bool = false
		}
	} while (bool)
	
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
