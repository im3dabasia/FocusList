/**
 * @fileoverview Main App component of the FocusList application.
 *
 * It renders the main input box for adding tasks and the to-do list component for displaying tasks.
 *
 * @package FocusList
 *
*/

import React from 'react'

//Import Contexts and Components.
import { TaskProvider } from './context/TaskContext'
import { ToastProvider } from './context/ToastContext'
import InputBox from './components/InputBox'
import ToDoList from './components/ToDoList'

// Import Assets.
import './App.scss'

function App() {
  return (
    <ToastProvider>
      <TaskProvider>
        <div className='app-container'>
          <h1>FocusList</h1>
          <h2>Organize today, achieve tomorrow</h2>
          <InputBox />
          <ToDoList />
        </div>
      </TaskProvider>
    </ToastProvider>
  )
}

export default App
