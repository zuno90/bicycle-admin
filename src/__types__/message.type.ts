export interface IUserList {
  user: IMessageUser;
  lastMsg: string;
}

export interface IMessage {
  user: IMessageUser;
  messages: IMessageContent[];
}

export interface IMessageContent {
  _id: string | number;
  sendTo: string | number;
  text: string;
  createdAt: Date | number;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: any;
}

export interface IMessageUser {
  _id: string | number;
  name: string;
  createdAt: Date;
}
