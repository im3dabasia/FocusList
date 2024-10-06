import React, { createContext, useContext, useState, useEffect } from 'react'

const TaskContext = createContext()

export const useTaskContext = () => {
  return useContext( TaskContext )
}

export const TaskProvider = ( { children } ) => {
  const [ tasks, setTasks ] = useState( () => {
    const savedTasks = sessionStorage.getItem( 'tasks' )
    return savedTasks ? JSON.parse( savedTasks ) : []
  } )

  useEffect( () => {
    sessionStorage.setItem( 'tasks', JSON.stringify( tasks ) )
  }, [ tasks ] )

  const addTask = ( newTask ) => {
    const task = { id: Date.now(), text: newTask, isDone: false }
    setTasks( ( prevTasks ) => [ ...prevTasks, task ] )
  }

  const removeTask = ( taskId ) => {
    setTasks( ( prevTasks ) => prevTasks.filter( ( task ) => task.id !== taskId ) )
  }

  const toggleTaskStatus = ( taskId ) => {
    setTasks( ( prevTasks ) =>
      prevTasks.map( ( task ) =>
        task.id === taskId ? { ...task, isDone: ! task.isDone } : task
      )
    )
  }

  const editTask = ( taskId, updatedText ) => {
    setTasks( ( prevTasks ) =>
      prevTasks.map( ( task ) =>
        task.id === taskId ? { ...task, text: updatedText } : task
      )
    )
  }

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, removeTask, toggleTaskStatus, editTask }}
    >
      {children}
    </TaskContext.Provider>
  )
}
