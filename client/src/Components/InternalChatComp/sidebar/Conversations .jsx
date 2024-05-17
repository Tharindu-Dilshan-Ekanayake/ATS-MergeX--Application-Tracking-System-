import useGetConversations from "../../../hooks/useGetConversations";
import { getRandomEmoji } from "../../../utils/emojis";
import Conversation from "./Conversation";
import useConversation from "../../../zustand/useConversation";
import { useEffect, useState } from 'react';

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	const { selectedConversation, inputselected } = useConversation();
	const [filteredConversations, setFilteredConversations] = useState([]);
	//const [forceUpdate, setForceUpdate] = useState(false);
/*
	const handleConversationClick = () => {
    setForceUpdate((prev) => !prev); // Toggle forceUpdate state to trigger re-render
  };*/

	useEffect(() => {
    if (inputselected) {
      // Filter conversations based on the selected conversation
      const filtered = conversations.filter((conversation) => conversation._id === inputselected._id);
      setFilteredConversations(filtered);
    } else {
      // If no conversation is selected, display all conversations
      setFilteredConversations(conversations);
    }
  }, [inputselected, conversations]);

	return (
		<div className='py-2 flex flex-col overflow-hidden  p-2'>
			{filteredConversations
			.filter(conversation => conversation.role !== 'candidate')
			.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
					//onConversationClick={handleConversationClick}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;



// STARTER CODE SNIPPET
// import Conversation from "./Conversation";

// const Conversations = () => {
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto'>
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 		</div>
// 	);
// };
// export default Conversations;