function sumThree(list = [], number = 0) {
	// 结果
	const _res = []
	// 数组总长度
	let _len = list.length
	// 排序 创造有序条件
	list.sort((a, b) => a - b)
	
	for (let i = 0; i < _len - 2; i++) {
		// 双指针的特殊情况 撞指针
		let left = i + 1
		let right = _len - 1

		// 与之前的数字相同 就跳过
		if (i > 0 && list[i] === list[i - 1]) continue

		while (left < right) {
			// 当前的求和
			const _count = list[i] + list[left] + list[right]
			if (_count > number) {
				right--
				while (left < right && list[right] === list[right - 1]) {
					right--
				}
			} else if (_count < number) {
				left++
				while (left < right && list[left] === list[left + 1]) {
					left++
				}
			} else {
				if (_count === number) _res.push([list[i], list[left], list[right]])
				left++
				right++
				while (left < right && list[right] === list[right + 1]) {
					right--
				}
				while (left < right && list[left] === list[left - 1]) {
					left++
				}
			}
		}
	}
	return _res
}

sumThree([-1, 0, 1, 2, -1, -4], 0)

