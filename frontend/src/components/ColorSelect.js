import React from 'react'
import Select from 'react-select'
import chroma from 'chroma-js'

const options = [
  {
    label: "Red",
    value: "red",
    color: "red"
  },
  {
    label: "Orange",
    value: "orange",
    color: "orange"
  },
  {
    label: "Yellow",
    value: "yellow",
    color: "yellow"
  },
  {
    label: "Pink",
    value: "pink",
    color: "pink"
  },
  {
    label: "Blue",
    value: "blue",
    color: "blue"
  },
];

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',
  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const customStyles = {
  control: (styles) => ({...styles, backgroundColor: "white", width: "150px"}),
  // Destructuring state in second parameter
  option: (styles, {data, isDisabled, isFocused, isSelected}) => {
    const color = chroma(data.color)
    return { 
      ...styles,
      backgroundColor: isDisabled
      ? undefined
      : isSelected
      ? data.color
      : isFocused
      ? color.alpha(0.8).css()
      : undefined,
      color: isDisabled
      ? '#ccc'
      : isSelected
      ? chroma.contrast(color, "white") > 2
        ? "white"
        : "black"
      : "black",
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
        ? isSelected
          ? data.color
          : color.alpha(0.3).css()
        : undefined
      },
      ':hover': {
        ...styles[':hover'],
        color: chroma.contrast(color, "white") > 2
        ? "white"
        : "black"
      }
    }
  },
  singleValue: (styles, { data }) => {
    const color = chroma(data.color)
    return {
      ...styles,
      color: chroma.contrast(color, 'white') < 1.5
      ? "black"
      : data.color,
      ...dot(data.color)
    }
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
}

export default function ColorSelect({ setColor, className, initialValue = null }) {
  const handleChange = (e) => {
    setColor(e.value)
  }

  return (
    <div className={className}>
      <label htmlFor='color'>Color: </label>
      <Select 
        options={options} 
        styles={customStyles}
        onChange={handleChange}
        defaultValue={options.find(option => option.value === initialValue)}
      />
    </div>
  )
}


