import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { getMesages, requestPermission } from "../utils/firebase.util";
import { channel } from "../utils/helper.util";

const Notification: React.FC = () => {
  const [notification, setNotification] = React.useState({
    title: "",
    body: "",
  });
  const notify = () => toast.error(<ToastDisplay />);
  const ToastDisplay = (): JSX.Element => (
    <div className="">
      <p>
        <b>{notification.title}</b>
      </p>
      <p>{notification.body}</p>
    </div>
  );

  React.useEffect(() => {
    requestPermission();
    getMesages();

    channel.addEventListener("message", (event) => {
      console.log("Receive background: ", event);
      setNotification({
        title: event.data.notification.title,
        body: event.data.notification.body,
      });
    });
  }, []);

  React.useEffect(() => {
    if (notification?.title) notify();
  }, [notification]);

  return <Toaster position="top-right" />;
};

export default Notification;
