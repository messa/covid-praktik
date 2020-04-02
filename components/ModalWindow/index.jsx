import React, { useEffect, useRef, useCallback } from 'react'
import classNames from 'classnames'

import Transition from 'Components/Transition'

import CloseSvg from 'Svg/error.svg'

import styles from './styles.scss'

const MOUSE_MOVE_CLOSING_THRESHOLD = 50

const ModalWindow = ({
  controller,
  transitionType = 'fade',
  className,
  children,
  mobileFullHeight,
  onClose = () => {},
  closeByClickingOut = true,
}) => {
  const [isOpen, setIsOpen] = controller
  const contentRef = useRef(null)

  let mouseDownX
  let mouseDownY

  let canClose = true

  const handleDocumentInteraction = useCallback(
    e => {
      if (
        !canClose ||
        !closeByClickingOut ||
        !contentRef.current ||
        contentRef.current.contains(e.target)
      ) {
        return
      }

      handleClose()
    },
    [contentRef]
  )

  const handleMouseDown = ({ clientX, clientY }) => {
    canClose = true

    mouseDownX = clientX
    mouseDownY = clientY
  }

  const handleMouseUp = ({ clientX, clientY }) => {
    if (
      Math.abs(clientX - mouseDownX) > MOUSE_MOVE_CLOSING_THRESHOLD ||
      Math.abs(clientY - mouseDownY > MOUSE_MOVE_CLOSING_THRESHOLD)
    ) {
      canClose = false
    }
  }

  const handleKeyUp = e => {
    if (e.key !== 'Escape' || e.which !== 27) {
      return
    }

    handleClose()
  }

  const handleClose = () => {
    setIsOpen(false)

    try {
      onClose()
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    window.document.addEventListener('mousedown', handleMouseDown, true)
    window.document.addEventListener('mouseup', handleMouseUp, true)
    window.document.addEventListener('click', handleDocumentInteraction, true)
    window.document.addEventListener('keyup', handleKeyUp, true)

    return () => {
      window.document.removeEventListener('mousedown', handleMouseDown, true)
      window.document.removeEventListener('mouseup', handleMouseUp, true)
      window.document.removeEventListener(
        'click',
        handleDocumentInteraction,
        true
      )
      window.document.removeEventListener('keyup', handleKeyUp, true)
    }
  }, [handleDocumentInteraction])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = ''
    }
  }, [isOpen])

  return (
    <Transition name={transitionType}>
      {isOpen && (
        <div className={styles.overlay}>
          <div
            className={classNames(styles.content, className, {
              [styles.mobileFullHeight]: mobileFullHeight,
            })}
            ref={contentRef}
          >
            <span className={styles.closeButton} onClick={handleClose}>
              <CloseSvg width={28} height={28} />
            </span>
            {children}
          </div>
        </div>
      )}
    </Transition>
  )
}

export default ModalWindow
