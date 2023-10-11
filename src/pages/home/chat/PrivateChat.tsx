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
  ConversationProps,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../utils/firebase.util";

const PrivateChat: React.FC = () => {
  const { id } = useParams();
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["id", id],
  //   queryFn: () => getUser(id),
  // });

  const sendMessage = (message: string) => {
    console.log(message);
  };
  const [userList, setUserList] = React.useState<ConversationProps[]>([]);
  const [incomingMessage, setIncommingMessage] = React.useState<MessageModel[]>(
    []
  );
  const [outGoingMessage, setOutGoingMessage] = React.useState<MessageModel[]>(
    []
  );

  const c = collection(db, "chat/user1/chats");
  const getUsers = () => {
    const usersQ = query(c, orderBy("createdAt", "desc"));

    onSnapshot(usersQ, (snapshot) => {});
  };

  const getIncommingMessages = async () => {
    const inCommingQ = query(c, orderBy("createdAt", "desc"));

    const chatsByUser = await getDocs(inCommingQ);
    const arr = [];
    chatsByUser.docs.map((doc) => arr.push(doc.data()));
    console.log(arr, 8788);
    return;
    onSnapshot(inCommingQ, (snapshot) => {
      setIncommingMessage(
        snapshot.docs.map((doc) => ({
          type: doc.data().text === "" ? "image" : "text",
          sender: doc.data().user.name,
          message: doc.data().text || doc.data().image,
          sentTime: doc.data().createdAt.toString(),
          direction: "incoming",
          position: "single",
        }))
      );
    });
  };

  React.useEffect(() => {
    Promise.all([getUsers(), getIncommingMessages()]);
  }, []);

  const addTest = () => {
    addDoc(c, { name: "wsdgwergwrgwer", createdAt: new Date() });
  };

  return (
    <section className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
        <p>Chat {">"} Nguyen Van A</p>
        <button type="button" className="bg-meta-1" onClick={addTest}>
          A
        </button>
      </h4>
      <div className="mb-4 relative h-[800px]">
        <MainContainer className="text-meta-1">
          <Sidebar className="w-2/4" position="left" scrollable>
            <ConversationList>
              {userList.map((user, index) => (
                <Conversation
                  key={index}
                  name={user.name}
                  info={user.info}
                  active={true}
                >
                  <Avatar src="https://i.pravatar.cc/50" />
                </Conversation>
              ))}
            </ConversationList>
          </Sidebar>
          <ChatContainer>
            <ConversationHeader>
              <Avatar src="https://i.pravatar.cc/50" />
              <ConversationHeader.Content
                userName="John"
                info="last active 10mins ago"
              ></ConversationHeader.Content>
            </ConversationHeader>
            <MessageList>
              <Message
                model={{
                  sender: "zuno",
                  message: "hey john",
                  sentTime: "5mins ago",
                  direction: "outgoing",
                  position: "single",
                }}
              />
              {incomingMessage.length > 0 &&
                incomingMessage.map((inMsg, index) => (
                  <Message
                    key={index}
                    model={{
                      type: inMsg.type,
                      sender: inMsg.sender,
                      message: inMsg.message,
                      sentTime: inMsg.sentTime,
                      direction: "incoming",
                      position: "single",
                    }}
                  >
                    {inMsg.type === "image" && (
                      <Message.ImageContent src={inMsg.message} />
                    )}
                    <Avatar src="https://i.pravatar.cc/50" />
                  </Message>
                ))}
            </MessageList>
            <MessageInput
              placeholder="Nhap tin nhan..."
              // attachButton={false}
              // sendButton={false}
              onSend={sendMessage}
            ></MessageInput>
          </ChatContainer>
        </MainContainer>
      </div>
    </section>
  );
};

export default PrivateChat;
