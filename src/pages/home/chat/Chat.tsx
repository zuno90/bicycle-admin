import React from "react";
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
  Loader,
  ExpansionPanel,
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
import AdminAvatar from "../../../assets/zuno.png";
import { db } from "../../../utils/firebase.util";
import { v4 as uuidv4 } from "uuid";
import { formatTimeAgo } from "../../../utils/helper.util";
import AWS from "aws-sdk";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

AWS.config.update({
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: import.meta.env.VITE_AWS_REGION,
});
const s3 = new AWS.S3();

const ADMINID = 99;

const imageMimeType = /image\/(png|jpg|jpeg|webp)/i;

const Chat: React.FC = () => {
  // State
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [userList, setUserList] = React.useState<IUserList[]>([]);
  const [currentUser, setCurrentUser] = React.useState<IMessageUser>();
  const [messages, setMessages] = React.useState<MessageModel[]>([]);

  const [inMessages, setInMessages] = React.useState<MessageModel[]>([]);
  const [outMessages, setOutMessages] = React.useState<MessageModel[]>([]);

  // image preview
  const imgUploadRef = React.useRef(null); // image upload input
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [previewImg, setPreviewImg] = React.useState<string>("");

  const attachImage = (event) => {
    const file = event.target.files[0];
    if (!file.type.match(imageMimeType)) return alert("Chỉ cho phép up ảnh");
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        const { result } = e.target;
        const imgElement = document.createElement("img");
        imgElement.src = result;
        imgElement.onload = async (ev) => {
          const maxW = 1000;
          try {
            const canvas = document.createElement(
              "canvas"
            ) as HTMLCanvasElement;
            const scaleSz = maxW / ev.target?.width;
            canvas.width = maxW;
            canvas.height = ev.target?.height * scaleSz;

            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.drawImage(ev.target, 0, 0, canvas.width, canvas.height);
            const srcEncoded = ctx?.canvas.toDataURL("image/jpeg");
            if (!srcEncoded) throw new Error("Base64 image is not avaiable!");

            const res = await fetch(srcEncoded);
            const blobFile = await res.blob();
            const imgFile = new File([blobFile], file.name, {
              type: "image/jpeg",
            });
            setPreviewImg(srcEncoded);
            setImageFile(imgFile);
          } catch (error) {
            console.error(error);
          }
        };
      };
    }
  };

  const uploadImageToS3 = async (imgFile: File) => {
    console.log(imgFile, "up xong");
    try {
      const params = {
        Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
        Key: "admin-chat/" + new Date().getTime() + imgFile.name,
        Body: imgFile,
      };

      const s3Img = await s3.upload(params).promise();
      const imgUrl = `${import.meta.env.VITE_AWS_CDN_CLOUDFONT}/${s3Img.Key}`;
      // send message
      await sendMessage(imgUrl, "image");
      setImageFile(null);
      setPreviewImg("");
    } catch (error) {
      console.error(error);
    }
  };

  // Firebase collection & doc
  const userCollection = collection(db, "chat");
  const chatDocByAdmin = doc(db, "chat", `user:${ADMINID}`);

  const sendMessage = async (message: string, type?: "text" | "image") => {
    const msgPayload = {
      _id: uuidv4(),
      createdAt: new Date(),
      text: !type || type === "text" ? message.trim() : "",
      image: type === "image" ? message.trim() : "",
      sendTo: currentUser?._id,
    };
    try {
      await updateDoc(chatDocByAdmin, {
        user: { _id: ADMINID, name: "ADMIN", avatar: AdminAvatar },
        messages: arrayUnion(msgPayload),
      });
    } catch (err) {
      await setDoc(chatDocByAdmin, {
        user: { _id: ADMINID, name: "ADMIN", avatar: AdminAvatar },
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
          .messages.sort(
            (a: IMessageContent, b: IMessageContent) =>
              Number(b.createdAt) - Number(a.createdAt)
          );
        userL.push({
          user: doc.data().user,
          lastMsg: lastM[0].text || lastM[0].image,
          sentAt: lastM[0].createdAt,
          unreadMsg: doc.data().unread ?? 0,
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
    const chatDocByUser = doc(db, "chat", `user:${id}`);
    try {
      const userDoc = await getDoc(chatDocByUser);
      if (!userDoc) throw new Error("User Doc not found!");
      setCurrentUser(userDoc.data()?.user);
      // update unread messages for user
      await updateDoc(chatDocByUser, { unread: 0 });
    } catch (error) {
      console.error(error);
    }
  };

  const getMessages = async (userId: number | string) => {
    const chatDocByUser = doc(db, "chat", `user:${userId}`);
    const unsubAdminDoc = onSnapshot(chatDocByAdmin, (outGoingDoc) => {
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
    const unsubUserDoc = onSnapshot(chatDocByUser, (inCommingDoc) => {
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
        <Sidebar position="left" scrollable>
          <ConversationList>
            {userList.length > 0 &&
              userList.map((user) => (
                <Conversation
                  key={user.user._id}
                  name={user.user.name}
                  info={user.lastMsg}
                  unreadCnt={user.unreadMsg}
                  active={currentUser?._id === user.user._id ?? false}
                  onClick={async () => {
                    if (currentUser?._id !== user.user._id) {
                      setIsLoading(true);
                      // updateReadMsg(user.user._id);
                      setPreviewImg("");
                      await Promise.all([
                        getUserById(user.user._id),
                        getMessages(user.user._id),
                      ]);
                      setIsLoading(false);
                    }
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
            <>
              <ChatContainer>
                <ConversationHeader>
                  <Avatar
                    src={UserAvatar}
                    onClick={() => console.log("go to user profile")}
                  />
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
                          <Message.ImageContent
                            src={msg.message}
                            alt="image-content"
                          />
                        )}
                        <Avatar
                          src={
                            msg.direction === "incoming"
                              ? UserAvatar
                              : AdminAvatar
                          }
                          onClick={() =>
                            msg.direction === "incoming" &&
                            console.log("go to user profile")
                          }
                        />
                        <Message.Footer
                          sentTime={msg.sentTime
                            ?.toDate()
                            .toLocaleString("en-US", { hour12: false })}
                        />
                      </Message>
                    ))}
                  {/* image preview */}
                </MessageList>

                <MessageInput
                  placeholder="Nhập tin nhắn..."
                  autoFocus
                  onAttachClick={() => imgUploadRef.current?.click()}
                  onSend={(_, text) => sendMessage(text)}
                />
              </ChatContainer>
              <Sidebar position="right">
                <ExpansionPanel title="Ảnh Upload" open={true}>
                  {previewImg && imageFile ? (
                    <section className="w-full flex flex-col justify-center items-center space-y-4">
                      <img className="object-fit" src={previewImg} />
                      <div className="w-full flex flex-col items-center space-y-2">
                        <button
                          onClick={() => uploadImageToS3(imageFile)}
                          type="button"
                          className="w-full text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-[#1da1f2]/55"
                        >
                          <svg
                            className="w-6 h-6 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M8,7.71V11.05L15.14,12L8,12.95V16.29L18,12L8,7.71Z" />
                          </svg>
                          Gửi
                        </button>
                        <button
                          onClick={() => setPreviewImg("")}
                          type="button"
                          className="w-full text-white bg-[#ff592f] hover:bg-[#f14e4e] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-[#3b5998]/55"
                        >
                          <svg
                            className="w-6 h-6 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
                          </svg>
                          Xoá
                        </button>
                      </div>
                    </section>
                  ) : (
                    <p className="text-center">Chưa có ảnh được chọn</p>
                  )}
                </ExpansionPanel>
              </Sidebar>
              {/* input file */}

              <input
                ref={imgUploadRef}
                type="file"
                accept="image/*"
                className="hidden"
                id="imgupload"
                onChange={attachImage}
              />
            </>
          )
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <Loader />
          </div>
        )}
      </MainContainer>
    </div>
  );
};

export default Chat;
