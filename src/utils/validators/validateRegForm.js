export const validateRegForm = (values) => {
	const errors = {}

	if (!values.fio) {
		errors.fio = 'Поле обязательно для заполнения'
	} else if (values.fio.length > 50) {
		errors.fio = 'Длина ФИО более 50 символов!'
	}

	if (!values.email) {
		errors.email = 'Поле обязательно для заполнения'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Некорректный E-mail'
	}

	if (!values.phone) {
		errors.phone = 'Укажите телефон'
	} else if (
		!/^(\+7|\+1|8){1}([(]?[0-9]{3}[)]?)[\s-]?[0-9]{3}[\s-]?[0-9]{2}([\s-]?[0-9]{2,4})?$/im.test(
			values.phone.trim()
		)
	) {
		errors.phone = 'Некорректный номер телефона'
	}

	if (!values.country) {
		errors.country = 'Поле обязательно для заполнения'
	} else if (values.country.length > 50) {
		errors.country = 'Длина названия страны более 50 символов!'
	}

	if (!values.city) {
		errors.city = 'Поле обязательно для заполнения'
	} else if (values.city.length > 50) {
		errors.city = 'Длина названия города более 50 символов!'
	}

	if (!values.os) {
		errors.os = 'Поле обязательно для заполнения'
	} else if (values.os.length > 70) {
		errors.os = 'Длина названия OC более 70 символов!'
	}

	if (!values.password) {
		errors.password = 'Поле обязательно для заполнения'
	} else if (values.password.length < 6) {
		errors.password = 'Длина пароля менee 6 символов'
	} else if (values.password.length > 15) {
		errors.password = 'Длина пароля более 15 символов'
	}

	return errors
}
