import React from "react";
import { getMesages, requestPermission } from "../utils/firebase.util";
import { channel, notify } from "../utils/helper.util";
import { ENotificationType, INotification } from "../__types__";

const CustomToast = ({ title, body }: INotification): JSX.Element => (
  <div className="flex flex-col gap-2">
    <h3 className="text-meta-1 text-md font-bold">{title}</h3>
    <p className="text-xs font-thin">{body}</p>
  </div>
);

const useNotification = () => {
  React.useEffect(() => {
    requestPermission();
    getMesages();

    channel.addEventListener("message", (event) => {
      console.log("Receive background from FB worker: ", event);
      notify(
        ENotificationType.info,
        <CustomToast
          title={event.data.notification.title}
          body={event.data.notification.body}
        />,
        `${new Date().getTime()}`
      );
    });
  }, []);
};

export default useNotification;
