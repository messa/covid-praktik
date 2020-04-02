import React from 'react'
import classNames from 'classnames'

import ErrorSvg from 'Svg/error.svg'
import InfoSvg from 'Svg/info.svg'
import SuccessSvg from 'Svg/success.svg'

import styles from './styles.scss'

function Message({
  className,
  children,
  error = false,
  show = true,
  success = false,
}) {
  if (!show) {
    return null
  }

  const Icon = error ? ErrorSvg : success ? SuccessSvg : InfoSvg

  return (
    <div
      className={classNames(styles.wrapper, className, {
        [styles.succcess]: success,
        [styles.error]: error,
      })}
    >
      <Icon className={styles.icon} /> {children}
    </div>
  )
}

export default Message
