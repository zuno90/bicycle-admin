import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../query/user.query";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationList,
  Conversation,
  Sidebar,
  Avatar,
  ConversationHeader,
  MessageModel,
} from "@chatscope/chat-ui-kit-react";
import {
  DocumentData,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { IMessageContent, IMessageUser, IUserList } from "../../../__types__";
import ChatWelcome1 from "../../../assets/chat-welcome1.jpeg";
import UserAvatar from "../../../assets/images/user/user-03.png";
import { db } from "../../../utils/firebase.util";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../../components/Loader";
import { formatTimeAgo, formatUnreadMsg } from "../../../utils/helper.util";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const ADMINID = 99;

const Chat: React.FC = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["id", id],
  //   queryFn: () => getUser(id),
  // });

  // State
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [userList, setUserList] = React.useState<IUserList[]>([]);
  const [currentUser, setCurrentUser] = React.useState<IMessageUser>();
  const [messages, setMessages] = React.useState<MessageModel[]>([]);

  const [inMessages, setInMessages] = React.useState<MessageModel[]>([]);
  const [outMessages, setOutMessages] = React.useState<MessageModel[]>([]);

  // Firebase collection & doc
  const userCollection = collection(db, "chat");
  const chatCollectionByAdmin = doc(db, "chat", `user:${ADMINID}`);

  const attachImage = () => {
    console.log(11);
  };

  const sendMessage = async (message: string) => {
    console.log(new Date());
    const msgPayload = {
      _id: uuidv4(),
      createdAt: new Date(),
      text: message,
      sendTo: currentUser?._id,
    };
    try {
      await updateDoc(chatCollectionByAdmin, {
        user: {
          _id: ADMINID,
          name: "ADMIN",
          avatar: "https://i.pravatar.cc/50",
        },
        messages: arrayUnion(msgPayload),
      });
    } catch (err) {
      await setDoc(chatCollectionByAdmin, {
        user: {
          _id: ADMINID,
          name: "ADMIN",
          avatar: "https://i.pravatar.cc/50",
        },
        messages: arrayUnion(msgPayload),
      });
    }
  };

  const initFetch = async () => {
    setIsLoading(true);
    try {
      const allDoc = await getDocs(userCollection);
      if (!allDoc) throw new Error("User Doc not found!");
      setUserList(takeLastMessage(allDoc));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const reRenderSidebar = () => {
    const unsub = onSnapshot(userCollection, (snap) =>
      setUserList(takeLastMessage(snap.docs))
    );
    return unsub;
  };

  const takeLastMessage = (docs: DocumentData) => {
    const userL: IUserList[] = [];
    docs.forEach((doc: DocumentData) => {
      if (doc.data().user._id !== ADMINID) {
        const lastM = doc
          .data()
          .messages.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
        userL.push({
          user: doc.data().user,
          lastMsg: lastM[0].text || lastM[0].image,
          sentAt: lastM[0].createdAt,
          unreadMsg: doc.data().messages.filter((msg) => msg.unread).length,
        });
      }
    });
    return userL;
  };

  React.useEffect(() => {
    initFetch();
    reRenderSidebar();
  }, []);

  const getUserById = async (id: number | string) => {
    const chatCollectionByUser = doc(db, "chat", `user:${id}`);
    try {
      const userDoc = await getDoc(chatCollectionByUser);
      if (!userDoc) throw new Error("User Doc not found!");
      setCurrentUser(userDoc.data()?.user);
    } catch (error) {
      console.error(error);
    }
  };

  const getMessages = async (userId: number | string) => {
    const chatCollectionByUser = doc(db, "chat", `user:${userId}`);
    const unsubAdminDoc = onSnapshot(chatCollectionByAdmin, (outGoingDoc) => {
      // console.log("Current data admin: ", outGoingDoc.data());
      const outMessages =
        outGoingDoc
          .data()
          ?.messages.filter((oM: IMessageContent) => oM.sendTo === userId)
          .map((iMsg: IMessageContent) => ({
            type: iMsg.text === "" ? "image" : "text",
            sender: outGoingDoc.data()?.user.name,
            message: iMsg.text || iMsg.image,
            sentTime: iMsg.createdAt,
            direction: "outgoing",
            position: "single",
          })) || [];
      setOutMessages(outMessages);
    });
    const unsubUserDoc = onSnapshot(chatCollectionByUser, (inCommingDoc) => {
      // console.log("Current data user: ", inCommingDoc.data());
      const inMessages =
        inCommingDoc.data()?.messages.map((iMsg: IMessageContent) => ({
          type: iMsg.text === "" ? "image" : "text",
          sender: inCommingDoc.data()?.user.name,
          message: iMsg.text || iMsg.image,
          sentTime: iMsg.createdAt,
          direction: "incoming",
          position: "single",
        })) || [];
      setInMessages(inMessages);
    });
    return [unsubAdminDoc, unsubUserDoc];
  };

  React.useEffect(() => {
    if (inMessages.length || outMessages.length) {
      const msgs = outMessages.concat(inMessages);
      console.log(
        msgs.sort(
          (a, b) =>
            new Date(a.sentTime.toDate()) - new Date(b.sentTime.toDate())
        )
      );
      setMessages(
        msgs.sort(
          (a, b) =>
            new Date(a.sentTime.toDate()) - new Date(b.sentTime.toDate())
        )
      );
    }
  }, [inMessages, outMessages]);

  const renderUserStatus = () => {
    const cUser = userList.filter((u) => u.user._id === currentUser?._id)[0];
    const deltaTime = Math.floor(
      (new Date() - new Date(cUser.sentAt.toDate())) / 1000
    );
    return formatTimeAgo(deltaTime);
  };

  return (
    <div className="relative h-[85vh]">
      <MainContainer className="text-meta-1">
        <Sidebar className="w-2/4" position="left" scrollable>
          <ConversationList>
            {userList.length > 0 &&
              userList.map((user) => (
                <Conversation
                  key={user.user._id}
                  name={user.user.name}
                  info={user.lastMsg}
                  // lastActivityTime={formatTimeAgo(
                  //   (new Date() - new Date(user.sentAt.toDate())) / 1000
                  // )}
                  unreadCnt={user.unreadMsg || 5}
                  active={currentUser?._id === user.user._id ?? false}
                  onClick={async () => {
                    setIsLoading(true);
                    await Promise.all([
                      getUserById(user.user._id),
                      getMessages(user.user._id),
                    ]);
                    setIsLoading(false);
                  }}
                >
                  <Avatar src={UserAvatar} />
                </Conversation>
              ))}
          </ConversationList>
        </Sidebar>
        {!isLoading ? (
          !currentUser ? (
            <div className="w-full flex flex-col justify-center items-center space-y-4">
              <div className="text-2xl">HELLO mấy ní!</div>
              <div className="text-xl">Bấm vào user để chat!</div>
              <img
                className="w-[40vw] object-cover"
                src={ChatWelcome1}
                alt="chat-welcome1"
              />
              <div className="text-xs italic">
                Để thuận tiện, mấy ní nên thao tác trên <b>Desktop</b> hoặc{" "}
                <b>Tablet</b>.
              </div>
            </div>
          ) : (
            <ChatContainer>
              <ConversationHeader>
                <Avatar src={UserAvatar} />
                <ConversationHeader.Content
                  userName={currentUser?.name}
                  info={renderUserStatus()}
                />
              </ConversationHeader>
              <MessageList>
                {messages.length > 0 &&
                  messages.map((msg, idx) => (
                    <Message
                      key={idx}
                      model={{
                        type: msg.type,
                        sender: msg.sender,
                        message: msg.message,
                        sentTime: msg.sentTime?.toString(),
                        direction: msg.direction,
                        position: msg.position,
                      }}
                    >
                      {msg.type === "image" && (
                        <Message.ImageContent src={msg.message} />
                      )}
                      <Avatar src={UserAvatar} />
                    </Message>
                  ))}
              </MessageList>
              <MessageInput
                placeholder="Nhập tin nhắn..."
                // attachButton={false}
                // sendButton={false}
                onAttachClick={attachImage}
                onSend={sendMessage}
              />
            </ChatContainer>
          )
        ) : (
          <Loader />
        )}
      </MainContainer>
    </div>
  );
};

export default Chat;
