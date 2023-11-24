import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/react.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/chatContext";
import { unReadNotificationsFunc } from "../../utils/unReadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat = ({ chat, user }) => {
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { latestMessage } = useFetchLatestMessage(chat);

  const unReadNotifications = unReadNotificationsFunc(notifications);
  const thisUserNotifications = unReadNotifications?.filter(
    (n) => n.senderId === recipientUser?.user?._id
  );

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText = shortText + "...";
    }

    return shortText;
  };
  const isOnline = onlineUsers?.some(
    (userr) => userr?.userId === recipientUser?.user._id
  );

  console.log(recipientUser?.user._id);

  return (
    <Stack
      onClick={() => {
        if (thisUserNotifications?.length > 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button">
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} height={35} />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.user?.name}</div>
          <div className="text">
            {latestMessage?.text && (
              <span>{truncateText(latestMessage.text)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">{moment(latestMessage.createdAt).calendar()}</div>
        <div
          className={
            thisUserNotifications?.length > 0 ? "this-user-notifications" : ""
          }>
          {thisUserNotifications?.length > 0
            ? thisUserNotifications.length
            : ""}
        </div>
        <div className={isOnline ? "user-online" : ""}></div>
      </div>
    </Stack>
  );
};

export default UserChat;
