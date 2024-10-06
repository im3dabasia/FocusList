/**
 * @fileoverview ToastContainer component for displaying toast notification.
 *
 * Renders each toast message with the appropriate style.
 *
 * @param {Array} toasts - Array of Toast Object.
 *
 * @package FocusList
 */
import React from 'react'

const ToastContainer = ( { toasts } ) => {
  return (
    <div className='toast-container'>
      {toasts.map( ( toast, index ) => (
        <div key={index} className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      ) )}
    </div>
  )
}

export default ToastContainer
