import { useState } from 'react';
// import axios from 'axios';
import apiRequest from '@/api/axios';
import ErrorAlert from '@/layouts/Error';
import useAuthContext from '@/context/AuthContext';
function UserRegistrationForm({ isModalOpen, setIsModalOpen }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        image: null,
    });
    // const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const {  clearErrors } = useAuthContext();
    const [errors, setError] = useState(null);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            console.log('Selected file:', e.target.files[0]); // Debugging the file
            setFormData((prevState) => ({
                ...prevState,
                image: e.target.files[0],
            }));
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('role', formData.role);
        if (formData.photo) {
            formDataToSend.append('image', formData.photo);
        }
    
        // Debugging: Log the FormData content
        for (const [key, value] of formDataToSend.entries()) {
            console.log(`${key}:`, value);
        }
    
        try {
            const response = await apiRequest('register', "POST",formDataToSend);
    
            console.log('User registered successfully:', response.data);
            setSuccess('User registered successfully!');
            setError(null);
            setIsModalOpen(false);
        }  catch (error) {
            setError(error.response?.data?.message || "Email has already been taken");
        }
            
    };
    

    return (
        isModalOpen && (
           
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-md w-full">
                    <h2 className="text-xl font-bold mb-4">Add New Member</h2>
                    {errors && <ErrorAlert message={errors} onClose={clearErrors} />}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <InputField
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter full name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <InputField
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter email address"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                required
                            >
                                <option value="">Select role</option>
                                <option value="member">member</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Profile Photo
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            />
                        </div>
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
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

function InputField({ id, value, onChange, name, placeholder, type = 'text', required = false }) {
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
