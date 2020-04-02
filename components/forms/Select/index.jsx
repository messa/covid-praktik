import React from 'react'
import classNames from 'classnames'
import Dropdown from '@rootre/forms-dropdown'

import Error from 'Components/forms/Error'

import { generateID } from 'Helpers/strings'

import styles from './styles.scss'

export default function Select({
  errorMessage = '',
  hasError = false,
  id = generateID(),
  label = '',
  name = '',
  onBlur = () => {},
  onChange = () => {},
  items = [],
  ...rest
}) {
  return (
    <div
      id={id}
      className={classNames(styles.wrapper, {
        [styles.error]: hasError,
      })}
    >
      {label && <label>{label}</label>}
      <div className={styles.container}>
        <Dropdown
          items={items}
          name={name}
          afterChange={onChange}
          onBlur={onBlur}
          {...rest}
        />
      </div>
      {errorMessage && <Error show={hasError} text={errorMessage} />}
    </div>
  )
}
