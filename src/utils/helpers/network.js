const delay = (ms) => {
	return new Promise((resolve) => setTimeout(() => resolve(), ms))
}

export const request = (fn, data) => {
	return delay(3000)
		.then(() => {
			return fn(data)
		})
		.then((json) => JSON.parse(json))
}
