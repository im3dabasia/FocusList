/**
 * @fileoverview InputBox component for adding or editing tasks.
 *
 * The component handles both task creation and editing.
 *
 * @package FocusList
 */

import React, { useState, useEffect } from 'react'

// Import Contexts and Components.
import { useTaskContext } from '../context/TaskContext'
import { useToast } from '../context/ToastContext'

// Import Assets.
import { ReactComponent as AddIcon } from '../assets/images/add-icon.svg'
import { ReactComponent as SaveIcon } from '../assets/images/save-icon.svg'

const InputBox = ( { isEditing, existingValue, handleSaveEdit } ) => {
  const [ inputText, setInputText ] = useState( existingValue || '' )
  const { addTask } = useTaskContext()
  const { addToast } = useToast() // Use the toast context

  useEffect( () => {
    if ( existingValue ) {
      setInputText( existingValue )
    }
  }, [ existingValue ] )

  const handleSubmit = ( e ) => {
    e.preventDefault()
    const trimmedInput = inputText.trim()

    if ( ! trimmedInput ) {
      addToast( 'Task cannot be empty!', 'info' )
      return
    }
    if ( trimmedInput ) {
      if ( isEditing ) {
        handleSaveEdit( trimmedInput )
        addToast( 'Task edited successfully!', 'info' )
      } else {
        addTask( trimmedInput )
        addToast( 'Task added successfully!', 'success' ) // Trigger a success toast
      }
      setInputText( '' )
    }
  }

  return (
    <form onSubmit={handleSubmit} className='input-form'>
      <input
        value={inputText}
        onChange={( e ) => setInputText( e.target.value )}
        placeholder={isEditing ? 'Edit your task' : 'Add a new task'}
      />
      <button
        type='submit'
        disabled={! inputText.trim()}
        aria-label={isEditing ? 'Save task' : 'Add task'}
      >
        {isEditing ? (
          <SaveIcon width='24' height='24' />
        ) : (
          <AddIcon width='24' height='24' />
        )}
      </button>
    </form>
  )
}

export default InputBox
