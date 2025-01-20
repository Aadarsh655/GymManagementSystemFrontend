import { useState } from 'react';
import apiRequest from '@/api/axios';
import ErrorAlert from '@/layouts/Error';
import useAuthContext from '@/context/AuthContext';

function UserRegistrationForm({ isModalOpen, setIsModalOpen, formFields, apiEndpoint }) {
    const [formData, setFormData] = useState({});
    const [success, setSuccess] = useState(null);
    const { clearErrors } = useAuthContext();
    const [errors, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e, image) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData((prevState) => ({
                ...prevState,
                [image]: e.target.files[0],
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            formDataToSend.append(key, value);
        }

        try {
            const response = await apiRequest(apiEndpoint, "POST", formDataToSend);
            console.log('Form submitted successfully:', response.data);
            setSuccess('Form submitted successfully!');
            setError(null);
            setIsModalOpen(false);
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-md w-full">
                    <h2 className="text-xl font-bold mb-4">Form</h2>
                    {errors && <ErrorAlert message={errors} onClose={clearErrors} />}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {formFields.map((field, index) => (
                            <div className="space-y-2" key={index}>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                {field.type === 'file' ? (
                                    <input
                                        type="file"
                                        id={field.image}
                                        name={field.image}
                                        onChange={(e) => handleFileChange(e, field.image)}
                                        accept={field.accept || 'image/*'}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    />
                                ) : field.type === 'select' ? (
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                        required={field.required}
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
                                        value={formData[field.name] || ''}
                                        onChange={handleInputChange}
                                        placeholder={field.placeholder}
                                        type={field.type}
                                        required={field.required}
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
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

function InputField({ id, value, onChange, name, placeholder, type = 'text', required = false }) {
    if (type === 'textarea') {
        return (
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                rows={6} // Adjust the number of rows for height
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 resize-none"
            />
        );
    }
    return (
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
        />
    );
}

export default UserRegistrationForm;
