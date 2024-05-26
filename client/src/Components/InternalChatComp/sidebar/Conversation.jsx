import { useSocketContext } from "../../../Context/SocketContext";
import useConversation from "../../../zustand/useConversation";


const Conversation = ({conversation, emoji, lastIdx }) => {

	const {selectedConversation, setSelectedConversation} = useConversation();
	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);
	console.log(conversation._id);
	const handleOnClick = () => {
    setSelectedConversation(conversation);
    // onConversationClick(); // Call the function passed from the parent component
  };
	
	return (
		<>
			<div className={
				`flex gap-2 items-center hover:bg-[#aa7049a1] rounded p-2 py-1 cursor-pointer px-1 mx-1
				${isSelected ? 'bg-[#aa7049a1]' : ''}
			`}
			onClick={handleOnClick} // setup the global state of selected coversation , can be accessed from anywhere
			>
				<div className={`avatar ${isOnline ? "online" : "" }`}>
					<div className='w-12 rounded-full'>
						<img
							src={conversation.image}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fname}</p>
						<span className='text-xl'></span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;