import Message from "../models/Message.js"
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

export const addChat = async (req, res) => {
    try {
        const { user1, user2, sender, message } = req.body;

        // Ensure the users are sorted alphabetically
        const users = [user1, user2].sort();

        // Check if a chat between these two users already exists
        let chat = await Message.findOne({ users });

        if (chat) {
            // If chat exists, add the new message
            chat.chat.push({ sender, message, timestamp: new Date() });
            await chat.save();
            return res.status(200).json({ msg: 'Message added to existing chat.', chat });
        } else {
            // If no chat exists, create a new one
            chat = new Message({
                users,
                chat: [{ sender, message, timestamp: new Date() }],
            });
            await chat.save();
            return res.status(200).json({ msg: 'New chat created.', chat });
        }
    } catch (error) {
        console.error('Error adding chat:', error);
        res.status(500).json({ msg: 'Failed to add chat.', error });
    }
};

export const addMessage = async (req, res) => {
    const { chatId, sender, message } = req.body;

    try {
        // Validate chatId
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).json({ msg: "Invalid chat ID" }); 
        }

        // Find the chat
        const foundChat = await Message.findById(chatId);
        if (!foundChat) {
            return res.status(404).json({ msg: "Chat not found" }); 
        }

        // Add the new message to the chat
        foundChat.chat.push({ sender, message, timestamp: new Date() });
        await foundChat.save();
        const { chat } = foundChat

        return res.status(200).json({ msg: "Message added successfully", chat }); 
    } catch (error) {
        console.error("Error adding message:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getChatsForUser = async (req, res) => {
    try {
        const token = req.cookies?.token; 

        if (!token) {
            return res.status(401).json({ msg: 'Brak tokena uwierzytelniającego. Zaloguj się, aby uzyskać dostęp do czatów.' });
        }

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            console.error("JWT secret key is not configured in environment variables.");
            return res.status(500).json({ error: "Błąd serwera: brak klucza uwierzytelniającego." });
        }

        let loggedInUserEmail;
        try {
            loggedInUserEmail = jwt.verify(token, secretKey); 
        } catch (error) {
            console.error('Błąd weryfikacji tokena w getChatsForUser:', error);
            return res.status(401).json({ msg: 'Nieprawidłowy lub wygasły token. Zaloguj się ponownie.' });
        }

        if (!loggedInUserEmail) {
            return res.status(401).json({ msg: "Nie udało się zdekodować emaila z tokena. Zaloguj się ponownie." });
        }

        // Find all chats involving the provided email
        const chats = await Message.find({ users: loggedInUserEmail });

        if (!chats || chats.length === 0) {
            return res.status(404).json({ msg: "No chats found for the provided email." });
        }

        // Map chats to include only the other user and the last message
        const formattedChats = chats.map((chat) => {
            const otherUser = chat.users.find((user) => user !== loggedInUserEmail);
            const lastMessage = chat.chat[chat.chat.length - 1]; // Get the last message in the chat

            return {
                id: chat._id,
                otherUser,
                lastMessage,
            };
        });

        res.status(200).json(formattedChats);
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({ msg: "Failed to fetch chats.", error });
    }
};

export const getChatById = async (req, res) => {
    try {
        const { id } = req.params;

        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ msg: 'Brak tokena uwierzytelniającego.' });
        }
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            return res.status(500).json({ error: "JWT secret key is not configured." });
        }

        let userEmail;
        try {
            userEmail = jwt.verify(token, secretKey);
        } catch (error) {
            console.log(userEmail)
            return res.status(401).json({ msg: 'Nieprawidłowy lub wygasły token.' });
        }

        if (!id) {
            return res.status(400).json({ msg: 'Chat ID is required.' });
        }

        const chat = await Message.findById(id); 

        if (!chat) {
            return res.status(404).json({ msg: 'Chat not found.' });
        }

        if (!chat.users.includes(userEmail)) { 
            return res.status(403).json({ msg: 'You are not authorized to view this chat.' });
        }

        res.status(200).json(chat);
    } catch (error) {
        console.error('Error fetching chat:', error);
        res.status(500).json({ msg: 'Failed to fetch chat.', error });
    }
};

