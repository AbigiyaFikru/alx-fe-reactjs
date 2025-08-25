import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Yup validation schema
const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'),
  
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(30, 'Password must be less than 30 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const FormikForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      // Simulate API call to JSONPlaceholder
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.username,
          email: values.email,
          password: values.password // Note: In real app, never send plain passwords!
        })
      });

      if (response.ok) {
        const data = await response.json();
        setStatus({ success: true, message: 'Registration successful!' });
        resetForm();
        setTimeout(() => setStatus(null), 3000);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      setStatus({ success: false, message: 'Registration failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Formik Registration</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status, errors, touched }) => (
          <Form className="space-y-4">
            {/* Status Messages */}
            {status && (
              <div className={`p-3 rounded-lg ${
                status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {status.message}
              </div>
            )}

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username *
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.username && touched.username
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                }`}
                placeholder="Enter your username"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email && touched.email
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                }`}
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password && touched.password
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                }`}
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword && touched.confirmPassword
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                }`}
                placeholder="Confirm your password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-200'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                'Register'
              )}
            </button>
          </Form>
        )}
      </Formik>

      {/* Form Features Demo */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Formik Features Demonstrated:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>✅ Built-in form state management</li>
          <li>✅ Yup validation schema integration</li>
          <li>✅ Error message handling</li>
          <li>✅ Touch state tracking</li>
          <li>✅ Submission state management</li>
          <li>✅ API integration simulation</li>
        </ul>
      </div>
    </div>
  );
};

export default FormikForm;
