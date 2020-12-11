import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { FormItem } from '../FormItem'
import { debounce, searchMatchByQuery } from '../../utils/helpers'
import './AutocompleteFormItem.scss'

const debounceFunc = debounce(searchMatchByQuery, 300)

export const AutocompleteFormItem = ({ items, name, fn, ...rest }) => {
	const [suggestions, setSuggestions] = useState([])
	const [text, setText] = useState('')
	const [isFocus, setIsFocus] = useState(false)
	const [isVisible, setIsVisible] = useState(true)

	const onChangeText = (e) => {
		const value = e.currentTarget.value
		const text = value.replace(/[&\\/#,+()$~%.'":*?<>{}]/, '')
		debounceFunc(text, items, setSuggestions)
		setText(text)
		fn(text)
		if (isFocus) {
			setIsFocus(true)
		}
	}

	const showAndHideSuggestions = useCallback(
		(bool) => {
			if (suggestions) setIsVisible(bool)
		},
		[suggestions]
	)

	const suggestionSelected = (value) => {
		setSuggestions([])
		setText(value)
		setIsFocus(true)
	}

	const suggestionsRender = () => {
		if (suggestions.length === 0) return null
		return (
			<ul className={`autocomplete-hints${!isVisible ? ' hidden' : ''}`}>
				{suggestions.map((text) => (
					<li
						key={`${[text]}`}
						className="autocomplete-hints__item"
						onClick={() => {
							suggestionSelected(text)
						}}
					>
						{text}
					</li>
				))}
			</ul>
		)
	}

	return (
		<div
			className="autocomplete"
			onPointerEnter={showAndHideSuggestions.bind(null, true)}
			onPointerLeave={showAndHideSuggestions.bind(null, false)}
		>
			<FormItem
				isFocus={isFocus}
				value={text}
				name={name}
				onChange={onChangeText}
				autoComplete="off"
				onFocus={showAndHideSuggestions.bind(null, true)}
				{...rest}
			/>
			{suggestionsRender()}
		</div>
	)
}

AutocompleteFormItem.propTypes = {
	items: PropTypes.arrayOf(PropTypes.string),
	name: PropTypes.string.isRequired,
	fn: PropTypes.func,
}

AutocompleteFormItem.defaultProps = {
	items: [],
	name: '',
	fn: () => {},
}
