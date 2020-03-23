import React from 'react'

function StagingEnvNotice() {
  if (typeof window === 'undefined') return null
  if (window.location.host.indexOf('now.sh') === -1) return null
  return (
    <p>
        Toto je testovací instance.
    </p>
  )
}

export default StagingEnvNotice

