import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Message, MessageSchema } from './Message.model';

const UserSchema = new Schema<User, UserModel>({
	username: {
		type: String,
		required: [true, 'username is required'],
		unique: true,
		lowercase: true,
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'email is required'],
		match: [
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
			'please provide a valid email address',
		],
		unique: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'password is required'],
		trim: true,
		min: [8, 'password must be at least 8 character long'],
		max: [16, 'password must be at most 16 character long'],
	},
	avatar: {
		type:
			{
				id: {
					type: String,
					required: [true, 'avatar id is required'],
				},
				url: {
					type: String,
					required: [true, 'avatar url is required'],
				},
			} || null,
		default: null,
	},
	about: {
		type: String,
		min: 3,
		max: 150,
	},
	isAcceptingMessages: {
		type: Boolean,
		default: true,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	verifyCode: {
		type: String,
		required: [true, 'verify code is required'],
	},
	verifyCodeExpiry: {
		type: Date,
		required: [true, 'verify expiry is required'],
	},
	messages: {
		type: [MessageSchema],
		required: true,
		default: [],
	},
});

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

UserSchema.methods.isPasswordCorrect = async function (password: string) {
	return bcrypt.compare(password, this.password);
};

UserSchema.methods.isVerifyCodeCorrect = async function (verifyCode: string) {
	const currentTime = new Date();
	if (currentTime > this.verifyCodeExpiry) {
		return { success: false, message: 'verify code expired', status: 400 };
	}
	if (verifyCode !== this.verifyCode) {
		return { success: false, message: 'Invalid code', status: 400 };
	}
	return { success: true, message: 'code matched!', status: 200 };
};

export interface User extends Document {
	avatar: {
		id: string;
		url: string;
	} | null;
	username: string;
	email: string;
	password: string;
	isAcceptingMessages: boolean;
	about: string;
	messages: Message[];
	isVerified: boolean;
	verifyCode: string;
	verifyCodeExpiry: Date;
}

interface InstanceMethods {
	isPasswordCorrect(password: string): Promise<boolean>;
	isVerifyCodeCorrect(verifyCode: string): Promise<{ success: boolean; message: string; status: number }>;
}

type UserModel = Model<User, InstanceMethods>;

const UserModel =
	(mongoose?.models?.User as mongoose.Model<User, UserModel, InstanceMethods>) || mongoose.model<User, InstanceMethods>('User', UserSchema);

export default UserModel;
