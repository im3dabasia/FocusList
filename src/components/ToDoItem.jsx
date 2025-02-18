/**
 * @fileoverview ToDoItem component for displaying and managing individual tasks.
 *
 * This component allows users to toggle task status (done/undo), edit tasks, and delete tasks.
 *
 * @param {object} task - The task object containing task details.
 *
 * @package FocusList
 */
import React, { useState } from 'react'

// Import Contexts and Components.
import { useTaskContext } from '../context/TaskContext'
import { useToast } from '../context/ToastContext' // Import useToast
import InputBox from './InputBox'

// Import Assets.
import { ReactComponent as EditIcon } from '../assets/images/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../assets/images/delete-icon.svg'
import { ReactComponent as DoneIcon } from '../assets/images/tick-icon.svg'
import { ReactComponent as UndoIcon } from '../assets/images/undo-icon.svg'

const ToDoItem = ( { task } ) => {
  const { removeTask, toggleTaskStatus, editTask } = useTaskContext()
  const { addToast } = useToast()
  const [ isEditing, setIsEditing ] = useState( false )

  const handleSaveEdit = ( updatedText ) => {
    editTask( task.id, updatedText )
    addToast( 'Task edited successfully!', 'info' )
    setIsEditing( false )
  }

  return (
    <div className={`task-item ${task.isDone ? 'completed' : ''}`}>
      {isEditing ? (
        <InputBox
          isEditing={true}
          existingValue={task.text}
          handleSaveEdit={handleSaveEdit}
        />
      ) : (
        <p>{task.text}</p>
      )}
      {! isEditing && (
        <div className='task-actions'>
          {/* Toggle Task Status: Done/Undo */}
          <button
            onClick={() => {
              toggleTaskStatus( task.id )
              addToast(
                task.isDone ? 'Task marked as undone!' : 'Task marked as done!',
                'success'
              ) // Toggle toast
            }}
          >
            {task.isDone ? (
              <UndoIcon width='24' height='24' />
            ) : (
              <DoneIcon width='24' height='24' />
            )}
          </button>

          {/* Edit Button */}
          <button onClick={() => setIsEditing( true )}>
            <EditIcon width='24' height='24' />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => {
              removeTask( task.id )
              addToast( 'Task deleted successfully!', 'error' )
            }}
          >
            <DeleteIcon width='24' height='24' />
          </button>
        </div>
      )}
    </div>
  )
}

export default ToDoItem
