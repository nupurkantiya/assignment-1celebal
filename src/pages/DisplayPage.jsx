import React from 'react'
import { useForm } from '../context/formContext.jsx'

const DisplayPage = () => {
  const { formData, resetForm } = useForm();

  const handleGoBack = () => {
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600 mb-2">✅ Form Submitted Successfully!</h1>
          <p className="text-gray-600">Here are the details you provided:</p>
        </div>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-600">First Name:</span>
                <p className="text-gray-800">{formData.firstName}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Last Name:</span>
                <p className="text-gray-800">{formData.lastName}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Username:</span>
                <p className="text-gray-800">{formData.username}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Email:</span>
                <p className="text-gray-800">{formData.email}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-600">Phone Number:</span>
                <p className="text-gray-800">{formData.countryCode} {formData.phoneNo}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Country:</span>
                <p className="text-gray-800">{formData.country}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">City:</span>
                <p className="text-gray-800">{formData.city}</p>
              </div>
            </div>
          </div>

          {/* Document Information */}
          <div className="pb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Document Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-600">PAN Number:</span>
                <p className="text-gray-800">{formData.panNo}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Aadhar Number:</span>
                <p className="text-gray-800">{formData.aadharNo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6 text-center">
          <button
            onClick={handleGoBack}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            Fill Another Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayPage;
