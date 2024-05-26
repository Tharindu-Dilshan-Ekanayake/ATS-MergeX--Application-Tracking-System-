// import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=929179f4"; 
//import { useEffect, useState} from 'react'
//import toast from "/node_modules/.vite/deps/react-hot-toast.js?v=929179f4";
//import useConversation from '../zustand/useConversation.js';

import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`/message/send//${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]); // setMessage function updates the messages array with newly updated messages array
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;