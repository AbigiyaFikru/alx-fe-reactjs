import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
})

const FormikForm = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Mock API call
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })
      
      if (response.ok) {
        alert('Registration successful with Formik!')
        resetForm()
      }
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="form-container">
      <h2>Formik Form</h2>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <Field 
                type="text" 
                name="username" 
                className="form-field"
              />
              <ErrorMessage name="username" component="div" className="error-text" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field 
                type="email" 
                name="email" 
                className="form-field"
              />
              <ErrorMessage name="email" component="div" className="error-text" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field 
                type="password" 
                name="password" 
                className="form-field"
              />
              <ErrorMessage name="password" component="div" className="error-text" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register with Formik'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormikForm
