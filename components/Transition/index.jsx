import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const defaultTimeout = 500
const mapNameToTimeout = {
  appear: 700,
  fade: 500,
  mediumFade: 300,
  fastFade: 150,
  slideDown: 300,
  slideLeft: 300,
  slideRight: 300,
}

function Transition({ children, name, timeout }) {
  if (!children) {
    return null
  }

  const timeOut = timeout || mapNameToTimeout[name] || defaultTimeout

  function getItems() {
    if (Array.isArray(children)) {
      return children
        .filter(child => !!child)
        .map((child, index) => (
          <CSSTransition key={index} classNames={name} timeout={timeOut}>
            {child}
          </CSSTransition>
        ))
    }

    return (
      <CSSTransition classNames={name} timeout={timeOut}>
        {children}
      </CSSTransition>
    )
  }

  return <TransitionGroup component={null}>{getItems()}</TransitionGroup>
}

export default Transition
