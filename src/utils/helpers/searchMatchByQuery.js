export const searchMatchByQuery = (value, items, fn) => {
	let match = []
	if (value.length > 0) {
		const regex = new RegExp(`^${value}`, 'i')
		match = items
			.sort()
			.filter((item) => regex.test(item))
			.slice(0, 5)
	}
	fn(() => match)
}
