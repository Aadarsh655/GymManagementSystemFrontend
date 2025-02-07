import { useState, useEffect } from 'react';
import apiRequest from '@/api/axios';
import ErrorAlert from '@/layouts/Error';
import useAuthContext from '@/context/AuthContext';

function UserRegistrationForm({ 
    isModalOpen, 
    setIsModalOpen, 
    formFields, 
    initialValues = {}, 
    handleSubmit,
    formTitle = "Add User"
}) {
    const [formData, setFormData] = useState(initialValues || {}); 
    const [previewImage, setPreviewImage] = useState(initialValues?.image || null);
    const { clearErrors } = useAuthContext();
    const [errors, setError] = useState(null);

    useEffect(() => {
        if (isModalOpen) {
            console.log("Initializing form data:", initialValues);  
            setFormData(initialValues || {});
    
            // Set preview image correctly
            if (initialValues?.image) {
                // Ensure image URL is absolute
                const fullImageUrl = initialValues.image.startsWith("http") 
                    ? initialValues.image 
                    : `http://localhost:8000/storage/${initialValues.image}`;
                setPreviewImage(fullImageUrl);
            } else {
                setPreviewImage(null);
            }
        }
    }, [initialValues, isModalOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e,fieldname) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFormData((prevState) => ({
                ...prevState,
                [fieldname]: file,
            }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSubmit(formData, setError, setIsModalOpen);
            clearErrors();
        } catch (error) {
            setError(error.message || "An error occurred.");
        }
    };

    return (
        isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-gradient-to-tr from-white via-red-50 to-red-100 p-10 rounded-lg max-w-xl w-full">
                    <h2 className="text-xl font-bold mb-4">{formTitle}</h2>
                    {errors && <ErrorAlert message={errors} onClose={clearErrors} />}
                    <form onSubmit={onSubmit} className="space-y-4">
                        {formFields.map((field, index) => (
                            <div className="space-y-2" key={index}>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                
                                {field.type === 'file' ? (
                                    <>
                                    <input
                                        type="file"
                                        id={field.image}
                                        name={field.image}
                                        // onChange={handleFileChange}
                                        onChange={(e) => handleFileChange(e, field.name)}
                                        accept={field.accept || 'image/*'}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    />
                                     {previewImage && (
                    <div className="mt-2">
                        <img
                            src={previewImage instanceof File ? URL.createObjectURL(previewImage) : previewImage}
                            alt="Image Preview"
                            className="w-24 h-24 object-cover rounded-full"
                        />
                    </div>
                )}
            </>
                                ) : field.type === 'select' ? (
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={formData[field.name] || ""}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ${
                                                 field.disabled ? "bg-gray-200 cursor-not-allowed" : "focus:ring-red-500 focus:border-red-500"
                                                 }`}
                                        required={field.required}
                                        disabled={field.disabled}
                                    >
                                        <option value="">{field.placeholder}</option>
                                        {field.options.map((option, idx) => (
                                            <option key={idx} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <InputField
                                        id={field.name}
                                        name={field.name}
                                        value={formData[field.name] || ""}
                                        onChange={handleInputChange}
                                        placeholder={field.placeholder}
                                        type={field.type}
                                        required={field.required}
                                        disabled={field.disabled}
                                    />
                                )}
                            </div>
                        ))}
                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                {initialValues?.id ? "Update" : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}
function InputField({ id, value, onChange, name, placeholder, type = 'text', required = false, disabled=false }) {
    return (
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ${
                disabled ? "bg-gray-100 cursor-not-allowed" : "focus:ring-red-500 focus:border-red-500"
            }`}
        />
    );
}
export default UserRegistrationForm;
