export interface IUserList {
  user: IMessageUser;
  lastMsg: string;
  sentAt: Date;
  unreadMsg: number;
}

export interface IMessage {
  user: IMessageUser;
  messages: IMessageContent[];
}

export interface IMessageUser {
  _id: string | number;
  name: string;
  avatar: string;
}

export interface IMessageContent {
  _id: string | number;
  sendTo?: string | number;
  unread?: boolean;
  createdAt: Date | number;
  text: string;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: any;
}
