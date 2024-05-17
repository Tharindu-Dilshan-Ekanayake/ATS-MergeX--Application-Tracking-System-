import React from 'react';
import ChatSidebar from '../sidebar/ChatSidebar';
import MessageContainer from '../messages/MessageContainer';

const Home = () => {
  return (
    <div className='flex h-full w-full rounded-3xl overflow-hidden bg-cover bg-center bg-opacity-50 bg-[#D9D9D9]'>
      <ChatSidebar />
      <MessageContainer />
    </div>
  )
}

export default Home
