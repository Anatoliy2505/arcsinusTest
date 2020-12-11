import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './FormItem.scss'

export const FormItem = ({
	fieldName,
	className,
	isFocus,
	label,
	input,
	name,
	meta: { touched, error },
	children,
	...rest
}) => {
	const elementRef = useRef(null)

	useEffect(() => {
		if (isFocus && !!elementRef.current) {
			elementRef.current.focus()
		}
	}, [isFocus])

	const Tag = fieldName ? `${fieldName}` : 'input'

	const itemClasess = classNames('form-item', className)

	const fieldClasses = classNames('form-item__field', [
		touched && error ? ' form-item__field_error' : '',
	])

	return (
		<div className={itemClasess}>
			{label && (
				<label htmlFor={name} className={'form-item__label'}>
					{label}
				</label>
			)}
			<Tag
				name={name}
				ref={elementRef}
				className={fieldClasses}
				{...input}
				{...rest}
			>
				{children}
			</Tag>
			{touched && error && (
				<span className={'form-item__error-message'}>
					<i className={'fas fa-exclamation-circle'}></i>
					{error}
				</span>
			)}
		</div>
	)
}

FormItem.propTypes = {
	isFocus: PropTypes.bool,
	fieldName: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
	label: PropTypes.string,
	input: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	meta: PropTypes.shape({
		touched: PropTypes.bool,
		error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	}),
}

FormItem.defaultProps = {
	isFocus: false,
	fieldName: '',
	className: '',
	children: null,
	label: '',
	name: '',
	input: {},
	meta: { touched: false, error: false },
}
