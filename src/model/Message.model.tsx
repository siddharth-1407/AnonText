import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Message extends Document {
	content: string;
	owner: Schema.Types.ObjectId;
	messageBy: Schema.Types.ObjectId;
	createdAt: Date;
	reply: string;
	isAnonymous: boolean;
}

export const MessageSchema: Schema<Message> = new Schema(
	{
		content: { type: String, required: true },
		owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		messageBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		reply: { type: String },
		isAnonymous: { type: Boolean, default: true },
	},

	{ timestamps: true }
);

const MessageModel: Model<Message> = (mongoose?.models?.Message as mongoose.Model<Message>) || mongoose.model<Message>('Message', MessageSchema);

export default MessageModel;
