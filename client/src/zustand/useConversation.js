import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	
	messages: [],
	setMessages: (messages) => set({ messages }),

	inputselected: null,
	setInputselected: (inputselected) => set({ inputselected }),
	
}));

export default useConversation;