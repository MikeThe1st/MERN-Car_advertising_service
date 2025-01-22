import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        users: {
            type: [String], // Array of two user emails
            required: true,
            validate: {
                validator: (arr) => arr.length === 2,
                message: "There must be exactly two users in a chat.",
            },
        },
        chat: [
            {
                sender: {
                    type: String, // Email of the sender
                    required: true,
                },
                message: {
                    type: String, // Message content
                    required: true,
                },
                timestamp: {
                    type: Date, // Timestamp of the message
                    default: Date.now,
                },
            },
        ],
    },
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
