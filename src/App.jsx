import { useState } from 'react'
import FormPage from './pages/FormPage'
import DisplayPage from './pages/DisplayPage'
import { FormProvider, useForm } from './context/formContext.jsx'

function AppContent() {
  const { isPassed } = useForm();
  
  return (
    <>
      {isPassed ? (
        <DisplayPage />
      ) : (
        <FormPage />
      )}
    </>
  );
}

function App() {
  return (
    <FormProvider>
      <AppContent />
    </FormProvider>
  )
}

export default App
