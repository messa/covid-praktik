import React from 'react'
import classNames from 'classnames'

import Error from 'Components/forms/Error'

import { generateID } from 'Helpers/strings'

import styles from './styles.scss'

export default function Input({
  children,
  errorMessage = '',
  hasError = false,
  id = generateID(),
  label = '',
  name = '',
  onBlur = () => {},
  onChange = () => {},
  type = 'text',
  value = '',
  ...rest
}) {
  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.error]: hasError,
      })}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <div
        className={classNames({
          [styles.container]: type !== 'hidden',
        })}
      >
        <input
          id={id}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          value={value}
          {...rest}
        />
        {children}
      </div>
      {errorMessage && <Error show={hasError} text={errorMessage} />}
    </div>
  )
}
