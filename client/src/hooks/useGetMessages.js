//const useEffect = __vite__cjsImport0_react["useEffect"]; 
//const useState = __vite__cjsImport0_react["useState"];
import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/message/${selectedConversation._id}`); // conversation model contain 2 arrays (columns), participants & messages 
				// this api respond the message array 
				const data = await res.json(); // this data contains the message array from conversation , model
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error('->'+error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;
