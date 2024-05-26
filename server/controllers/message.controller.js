const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');
const { getReceiverSocketId, io } = require('../socket/socket');

const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },// participants field of the document should contain all the documents of this array
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// await newMessage.save();
		// await conversation.save();

		// this will run parallal
		await Promise.all([newMessage.save(), conversation.save()]);  // we get the message and save the dtaBase 

		// SOCKET IO FUNCTIONALITY HERE
		const receiverSocketId = getReceiverSocketId(receiverId);     // then send the messgae to client using sockets
		if(receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}


		res.status(201).json(newMessage);

	} catch (error) {
		console.log("Error in sendMessage controller", error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params; // UserChat we are looking for
		const senderId = req.user._id; // user_id contain within the request header

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] }, // select the document where the participants field contains both the user_id and userToChatId
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]); // if conversation dont have any messages then empty array will be sent

		const messages = conversation.messages;

		res.status(200).json(messages);

	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	sendMessage,
	getMessages
};

