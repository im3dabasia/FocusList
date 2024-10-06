import React, { createContext, useState, useContext } from 'react'

// Import Contexts and Components.
import ToastContainer from '../components/ToastContainer'

const ToastContext = createContext()

export const ToastProvider = ( { children } ) => {
  const [ toasts, setToasts ] = useState( [] )

  const addToast = ( message, type = 'success' ) => {
    setToasts( [ ...toasts, { message, type } ] )

    // Remove the toast after 3 seconds
    setTimeout( () => {
      setToasts( toasts.slice( 1 ) )
    }, 3000 )
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  return useContext( ToastContext )
}
