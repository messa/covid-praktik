import React, { useRef } from 'react'
import classNames from 'classnames'

import styles from './styles.scss'

export default function Form({ className = '', onSubmit, children, formHook }) {
  const formRef = useRef()

  function submitForm(e) {
    e.preventDefault()

    if (formHook) {
      const { values, handleValidate } = formHook

      let hasError = false

      Object.keys(values).forEach(name => {
        if (!handleValidate(name, values[name]) && !hasError) {
          hasError = true
          const elm = document.getElementById(name)
          if (elm) {
            elm.scrollIntoView({
              behavior: 'smooth',
            })
          } else {
            console.error('missing element with id:', name)
          }
        }
      })

      if (hasError) {
        return
      }
    }

    typeof onSubmit === 'function' && onSubmit(e)
  }

  return (
    <form
      ref={formRef}
      className={classNames(styles.form, className)}
      onSubmit={submitForm}
    >
      {children}
    </form>
  )
}
