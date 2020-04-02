import React from 'react'

import styles from './styles.scss'

export default function Success({ show = false, text = '' }) {
  if (!show) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <p>{text}</p>
    </div>
  )
}
