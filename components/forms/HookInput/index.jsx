import React from 'react'

import Input from 'Components/forms/Input'

export default function HookInput({ formHook, name, ...rest }) {
  const { values, errors, handleChange, handleValidate } = formHook

  return (
    <Input
      hasError={errors[name]}
      onBlur={({ target: { value } }) => handleValidate(name, value)}
      onChange={({ target }) => {
        const { type, value } = target
        handleChange(name, type === 'checkbox' ? target.checked : value)
      }}
      value={values[name]}
      id={name}
      {...rest}
    />
  )
}
