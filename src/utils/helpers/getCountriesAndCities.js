import { countriesAndCities } from '../../countriesAndCities'

export const getCountriesAndCities = () => {
	try {
		if (!countriesAndCities) {
			return null
		}
		const countries = Object.keys(countriesAndCities)
		const cities = []
		for (let key in countriesAndCities) {
			cities.push(...countriesAndCities[key])
		}
		return {
			countries,
			allData: countriesAndCities,
			cities,
		}
	} catch (e) {
		console.log(e)
		return null
	}
}
