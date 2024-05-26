import React, { useContext, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import toast from 'react-hot-toast';
import dayjs from 'dayjs'; // Import dayjs library

import { UserContext } from '../../Context/UserContext';

export default function StatusUpdatePopup({ visible, onClose }) {
    const { user } = useContext(UserContext);

    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        user_id:  'asd',
        user_fname: user ? user.fname : '',
        user_lname: user ? user.lname : '',
        user_email: user ? user.email : '',
        time: '', // Initialize time as an empty string
        image: '',
        description: '',
    });

    useEffect(() => {
        if (!visible) {
            // Reset image field when popup is closed
            setImage(null);
        }
    }, [visible]);

    useEffect(() => {
        if (user ) {
            setData({
                user_id: 'asd',
                user_fname: user.fname,
                user_lname: user.lname,
                user_email: user.email,
                time: dayjs().format('HH:mm:ss'), // Set the current time
                image: '',
                description: '',
            });
        }
    }, [user, user._id]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log('File:', reader.result);
                setImage(reader.result);
                setData({ ...data, [name]: reader.result });
            };
        } else {
            console.log('Non-file input:', { name, value });
            setData({
                ...data,
                [name]: value,
                time: name === 'description' ? dayjs().format('HH:mm:ss') : data.time, // Update time when description changes
            });
        }
    };

    const statusUpdate = async (e) => {
        e.preventDefault();
        if (user) {
            try {
                const response = await axios.post('/status/update', data);
                if (response.data.error) {
                    toast.error(response.data.error);
                } else {
                    setData({
                        user_id: 'asd',
                        user_fname: user.fname,
                        user_lname: user.lname,
                        user_email: user.email,
                        time: dayjs().format('HH:mm:ss'), // Set the current time
                        image: '',
                        description: '',
                    });
                    setImage(null);

                    onClose();
                    toast.success('Status updated successfully!');
                }
            } catch (error) {
                console.error('Error updating status:', error);
            }
        }
    };

    if (!visible || !user) return null;

    console.log('User ID:', data.user_id);
    console.log('All Data:', data);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
            <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-fit w-[500px] border-orange-700 border-[1px]">
                <button
                    className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
                    onClick={onClose}
                >
                    <IoMdClose className="text-white hover:text-red-700" />
                </button>
                <form onSubmit={statusUpdate}>
                    <div className='flex justify-center '>
                        {image ? (
                            <div className="">
                                <img src={image} alt="Uploaded" className="rounded-md  w-[400px] " />
                            </div>
                        ) : (
                            <img src='' alt='Upload' className="hidden"></img>
                        )}
                    </div>

                    <div className='flex justify-center pt-3 '>
                        <div className='pt-2'>
                            <input
                                accept='image/*'
                                type='file'
                                name='image'
                                className='rounded-lg h-10 w-[200px] pl-3 pr-3 text-white'
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <textarea
                            placeholder='Type small text or description'
                            className='text-white bg-white rounded-sm bg-opacity-10 w-[400px] px-3'
                            name='description'
                            value={data.description}
                            onChange={handleChange}
                        />
                    </div>
                    {/*<div>
                    {!!user && <h1 className='opacity-40'> {user._id} </h1>}
                    <h1>{user.fname} {user.lname}</h1>
                    <h1>{user._id}</h1>
                    <h1>{user.email}</h1>
                    </div>*/}
                    <div className='pt-8'>
                        <button type='submit' className='bg-orange-600 w-[100px] h-10 rounded-lg '>SEND</button>
                    </div>
                </form>
            </div>
        </div>
    );
}