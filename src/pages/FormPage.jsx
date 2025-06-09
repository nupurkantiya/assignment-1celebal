import React, { useState, useEffect } from 'react'
import { useForm } from '../context/formContext.jsx'

const FormPage = () => {
  const { 
    formData, 
    validationErrors, 
    updateFormData, 
    validateField,
    validateAllFields,
    submitForm 
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Countries and cities data
  const countries = ['India', 'USA', 'UK', 'Canada', 'Australia'];
  const citiesByCountry = {
    'India': ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'],
    'USA': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
    'UK': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Bristol'],
    'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
    'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide']
  };

  const countryCodes = {
    'India': '+91',
    'USA': '+1',
    'UK': '+44',
    'Canada': '+1',
    'Australia': '+61'
  };

  // Check form validity whenever form data changes
  useEffect(() => {
    const checkValidity = () => {
      const requiredFields = ['firstName', 'lastName', 'username', 'email', 'password', 'phoneNo', 'country', 'city', 'panNo', 'aadharNo'];
      const hasAllFields = requiredFields.every(field => formData[field]?.trim());
      const hasNoErrors = Object.values(validationErrors).every(error => !error);
      setIsFormValid(hasAllFields && hasNoErrors);
    };
    checkValidity();
  }, [formData, validationErrors]);

  const handleInputChange = (field, value) => {
    updateFormData(field, value);
  };

  const handleInputBlur = (field, value) => {
    validateField(field, value);
  };

  const handleCountryChange = (country) => {
    updateFormData('country', country);
    updateFormData('city', ''); // Reset city when country changes
    updateFormData('countryCode', countryCodes[country] || '+91');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Registration Form</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                onBlur={(e) => handleInputBlur('firstName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter first name"
              />
              {validationErrors.firstName && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                onBlur={(e) => handleInputBlur('lastName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter last name"
              />
              {validationErrors.lastName && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
              )}
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username *
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              onBlur={(e) => handleInputBlur('username', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                validationErrors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter username"
            />
            {validationErrors.username && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={(e) => handleInputBlur('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                validationErrors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter email"
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onBlur={(e) => handleInputBlur('password', e.target.value)}
                className={`w-full px-3 py-2 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600 hover:text-gray-800"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {validationErrors.password && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="flex">
              <select
                value={formData.countryCode}
                onChange={(e) => updateFormData('countryCode', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+61">+61</option>
              </select>
              <input
                type="tel"
                value={formData.phoneNo}
                onChange={(e) => handleInputChange('phoneNo', e.target.value)}
                onBlur={(e) => handleInputBlur('phoneNo', e.target.value)}
                className={`flex-1 px-3 py-2 border-t border-r border-b rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.phoneNo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter phone number"
              />
            </div>
            {validationErrors.phoneNo && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.phoneNo}</p>
            )}
          </div>

          {/* Country and City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <select
                value={formData.country}
                onChange={(e) => handleCountryChange(e.target.value)}
                onBlur={(e) => handleInputBlur('country', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.country ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {validationErrors.country && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.country}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <select
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                onBlur={(e) => handleInputBlur('city', e.target.value)}
                disabled={!formData.country}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.city ? 'border-red-500' : 'border-gray-300'
                } ${!formData.country ? 'bg-gray-100' : ''}`}
              >
                <option value="">Select City</option>
                {formData.country && citiesByCountry[formData.country]?.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {validationErrors.city && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
              )}
            </div>
          </div>

          {/* Document Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PAN Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN Number *
              </label>
              <input
                type="text"
                value={formData.panNo}
                onChange={(e) => handleInputChange('panNo', e.target.value.toUpperCase())}
                onBlur={(e) => handleInputBlur('panNo', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.panNo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="ABCDE1234F"
                maxLength={10}
              />
              {validationErrors.panNo && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.panNo}</p>
              )}
            </div>

            {/* Aadhar Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhar Number *
              </label>
              <input
                type="text"
                value={formData.aadharNo}
                onChange={(e) => handleInputChange('aadharNo', e.target.value)}
                onBlur={(e) => handleInputBlur('aadharNo', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.aadharNo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123456789012"
                maxLength={12}
              />
              {validationErrors.aadharNo && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.aadharNo}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                isFormValid
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
