import { useAuthContext } from "../../../Context/AuthContext";
import useConversation from "../../../zustand/useConversation";
import { extractTime } from '../../../utils/extractTime';

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = ( message.senderId === authUser._id);
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.image : selectedConversation?.image;
	const bubbleBgColor = fromMe ? "bg-[#E77327]" : "bg-[rgb(185 28 28)]";

	const shakeClass = message.shouldShake ? "shake" : "";
	console.log(authUser.image);

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>{formattedTime}</div>
		</div>
	);
};
export default Message;

