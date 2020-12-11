export const debounce = (fn, ms) => {
	let timeout
	return function () {
		clearTimeout(timeout)

		const fnCall = () => {
			fn.apply(this, arguments)
		}

		timeout = setTimeout(fnCall, ms)
	}
}
