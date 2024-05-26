type UserProfileData = {
	_id: string;
	username: string;
	email: string;
	avatar: {
		id: string;
		url: string;
	} | null;
	messageCount?: number;
	isAcceptingMessages: boolean;
	about: string;
};

type MessagesData = {
	success: boolean;
	message: string;
	messages: MessageCard[];
};

type MessageBy = {
	_id: string;
	username: string;
	avatar: null | {
		id: string;
		url: string;
	};
};
type MessageCard = {
	_id: string;
	content: string;
	owner: string;
	messageBy?: MessageBy;
	reply: string;
	isAnonymous: boolean;
};
type NavLinks = {
	id: number;
	title: string;
	path: string;
};

type MessageCardProp = {
	data: MessageCard;
	user: UserProfileData;
};
type SendReplyFormProps = {
	messageData: MessageCard;
	handleClose?: any;
	children: ReactNode;
};

type NavLinkProps = {
	link: { id: number; title: string; path: string; onAuth: boolean };
};

type AboutSection = {
	id: number;
	heading: string;
	text?: string;
	points?: { id: number; title: string; content: string }[];
};
