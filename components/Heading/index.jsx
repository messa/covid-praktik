import React from 'react'
import classNames from 'classnames'

import styles from './styles.scss'

/**
 * @param {string} text
 * @param {number} level - 1-6
 * @param {string} [className]
 * @param {React.Component} [children]
 * @param {any} [...attrs]
 * @return {React.Component}
 * @constructor
 */
function Headline({ text, className, level = 2, children, ...attrs }) {
  const Component = `h${level}`

  return (
    <div
      className={classNames(styles.wrapper, className, styles[`h${level}`])}
      {...attrs}
    >
      <Component>{text}</Component>
      {children}
    </div>
  )
}

export default Headline
