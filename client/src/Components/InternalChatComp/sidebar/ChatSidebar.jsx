import React from 'react'
import Conversations from '../sidebar/Conversations ';
// import LogoutButton from './LogoutButton'
import SearchInput from '../sidebar/SearchInput';

const ChatSidebar = () => {
  return (
    <div className='border-r border-slate-700 p-4 w-3/12 flex flex-col bg-[#2a2a2a] opacity-85 h-full'>
      <SearchInput />
      <div className='divider px-3'></div>
      <Conversations />
      {/* <LogoutButton /> */}
    </div>
  )
}
export default ChatSidebar
