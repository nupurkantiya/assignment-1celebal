import { useContext, createContext, useState } from "react";

export const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    countryCode: '+91',
    country: '',
    city: '',
    panNo: '',
    aadharNo: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPassed, setIsPassed] = useState(false);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateField = (field, value) => {
    let error = '';
    
    switch (field) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) error = `${field === 'firstName' ? 'First' : 'Last'} name is required`;
        break;
      case 'username':
        if (!value.trim()) error = 'Username is required';
        else if (value.length < 3) error = 'Username must be at least 3 characters';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email is invalid';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 6) error = 'Password must be at least 6 characters';
        break;
      case 'phoneNo':
        if (!value.trim()) error = 'Phone number is required';
        else if (!/^\d{10}$/.test(value)) error = 'Phone number must be 10 digits';
        break;
      case 'country':
        if (!value) error = 'Country is required';
        break;
      case 'city':
        if (!value) error = 'City is required';
        break;
      case 'panNo':
        if (!value.trim()) error = 'PAN number is required';
        else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) error = 'Invalid PAN format';
        break;
      case 'aadharNo':
        if (!value.trim()) error = 'Aadhar number is required';
        else if (!/^\d{12}$/.test(value)) error = 'Aadhar must be 12 digits';
        break;
    }
    
    setValidationErrors(prev => ({
      ...prev,
      [field]: error
    }));
    
    return error === '';
  };

  const validateAllFields = () => {
    let isValid = true;
    const errors = {};
    
    Object.keys(formData).forEach(field => {
      if (field !== 'countryCode') {
        const fieldValid = validateField(field, formData[field]);
        if (!fieldValid) isValid = false;
      }
    });
    
    setIsFormValid(isValid);
    return isValid;
  };

  const submitForm = () => {
    if (validateAllFields()) {
      setIsPassed(true);
      return true;
    }
    return false;
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      phoneNo: '',
      countryCode: '+91',
      country: '',
      city: '',
      panNo: '',
      aadharNo: ''
    });
    setValidationErrors({});
    setIsFormValid(false);
    setIsPassed(false);
  };

  return (
    <FormContext.Provider value={{
      formData,
      validationErrors,
      isFormValid,
      isPassed,
      updateFormData,
      validateField,
      validateAllFields,
      submitForm,
      resetForm
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  return useContext(FormContext);
};