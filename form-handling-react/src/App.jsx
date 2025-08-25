import React from 'react'
import ControlledForm from './components/ControlledForm'
import FormikForm from './components/FormikForm'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>React Form Handling Demo</h1>
      <div className="forms-container">
        <ControlledForm />
        <FormikForm />
      </div>
    </div>
  )
}

export default App
