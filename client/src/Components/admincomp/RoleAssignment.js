import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';

export default function RoleAssignment({ visible, onClose, user }) {
    const [formData, setFormData] = useState(() => {
        const storedFormData = localStorage.getItem('formData');
        return storedFormData ? JSON.parse(storedFormData) : { 
            role: '' 
        };
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            setFormData({
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                phone_number: user.phone_number,
                role: user.role,
                education: user.education,
                bio: user.bio,
                dob: user.dob,
                gender: user.gender,
                image: user.image,
            });
        }
    }, [user]);

    const handleRoleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/users/${user._id}`, formData);
            onClose();
            localStorage.removeItem('formData');
        } catch (error) {
            setError(error.message);
        }
    };
    
    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    if (!visible || !user) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
            <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-[500px] w-[500px] border-orange-700 border-[1px]">
                <button
                    className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
                    onClick={onClose}
                >
                    <IoMdClose className="text-white hover:text-red-700" />
                </button>

                <div>
                    <div className=''>
                        <h1 className='text-2xl text-orange-600'>Select Role</h1>
                    </div>
                    <div className='flex justify-center pt-2'>
                        <img src={user.image} alt='' className='w-[150px] h-[150px] rounded-full border-[2px]' />
                    </div>
                    <div className='pt-4'>
                        <h1 className='text-[13px] text-orange-500'>{user._id}</h1>
                        <h1>{user.fname} {user.lname}</h1>
                        <label className=' opacity-40'>{user.role}</label>
                        
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='flex justify-center pt-6'>
                            <div className='text-start'>
                            <div>
                                <label className='opacity-45'>Select Role :</label> 
                            </div>
                            
                            <div>
                                <select
                                    name='role'
                                    className='lg:w-[150px] h-10 text-left rounded-lg bg-opacity-90 md:48 optional:bg-[#ffffff21]'
                                    value={formData.role || user.role}
                                    onChange={handleRoleChange}
                                >
                                    
                                        <option value='admin' className='text-white bg-black bg-opacity-90'>Admin</option>
                                        <option value='recruiter' className='text-white bg-black bg-opacity-90'>Recruiter</option>
                                        <option value='hiring manager' className='text-white bg-black bg-opacity-90' >Hiring Manager</option>
                                        <option value='interviewer' className='text-white bg-black bg-opacity-90' >Interviewer</option>
                                        <option value='candidate' className='text-white bg-black bg-opacity-90' >Candidae</option>
                                </select>
                            </div>
                            </div>
                            
                        </div>
                        <div className='pt-6'>
                            <button type="submit" className="px-4 py-2 font-bold text-white bg-orange-600 rounded hover:bg-orange-400">
                                Save
                            </button>
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
