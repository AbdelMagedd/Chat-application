/* eslint-disable no-unused-vars */
import { useContext } from "react"
import { Container, Stack } from 'react-bootstrap'

import { ChatContext } from "../context/chatContext"
import UserChat from "../components/chat/UserChat"
import { AuthContext } from "../context/AuthContext"
import PotentialChats from "../components/chat/PotentialChats"
import ChatBox from "../components/chat/ChatBox"

function Chat() {
  const {user} = useContext(AuthContext)
  const {userChatError,userChats , isUserChatLoading ,updateCurrentChat} = useContext(ChatContext)

  console.log("use chats " , userChats)
  return (
    <Container>
      <PotentialChats />
      {userChats?.length < 1 ? null : ( <Stack direction="horizontal" gap={4} className="align-items-start">
        <Stack className="messages-box flex-grow-0 pe-3" gap={3} >
          { isUserChatLoading && <p>loading chats ...</p>}
          {userChats?.map((chat , index) => {
            return (
              <div key={index} onClick={() => updateCurrentChat(chat)}>
                <UserChat chat={chat} user = {user} />
              </div>
            )
          })}
        </Stack>
        <ChatBox />
        </Stack>)}
    </Container>
  )
}

export default Chat