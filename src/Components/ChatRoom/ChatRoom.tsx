import React, { ReactNode, useContext, useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Button from '../Button';
import InputContainer from '../InputContainer';
import LeftMessage from '../LeftMessage/LeftMessage';
import RightChatBubble from '../RightChatBubble/RightChatBubble';
import { MessengingContext } from '../../Contexts/MessengingContext';
import { SideBarContext} from '../../Contexts/SideBarContext'; // Assuming SenderType is defined in SideBarContext
import supabase from '../../Utils/api';

interface ChatMessage {
  message: string;
  receiverFN: string;
  receiverLN:string; // Assuming SenderType is an enum or string type for sender identification
}

interface ChatRoomProps {
  children?: ReactNode; // Accepts any ReactNode as children
}

const ChatRoom: React.FC<ChatRoomProps> = ({ children }) => {
  const { messagesent } = useContext(MessengingContext);
  const { sender,user,inboxClicked } = useContext(SideBarContext);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('AgentChats')
        .select('message,OwnerFirstName,OwnerLastName')
         

      if (data) {
        const formattedMessages: ChatMessage[] = data.map((msg: any) => ({
          message: msg.message,
            receiverFN: msg.OwnerFirstName,
            receiverLN:msg.OwnerLastName // Assuming 'sender' field is part of the fetched data
        }));
        setChatMessages(formattedMessages);
      }
    };

    fetchData();
  }, [sender]);
  console.log(sender)

  return (
    <div>
      <NavBar status="Etudiant" />
      {inboxClicked && <div style={{ backgroundColor: "#F6F7FB", overflowY: "auto", height: "29rem" }}>
        {chatMessages.map((message, index) => {
          if (message.receiverFN===user.firstName){
            return (
              <LeftMessage
                key={index}
                message={message.message}
                ImageUrl="https://example.com/avatar.jpg"
              />
            );
          } else if (message.receiverFN===sender.firstName) {
            return (
              <RightChatBubble
                key={index}
                message={message.message}
                ImageUrl="https://example.com/avatar.jpg"
              />
            );
          }
        })}
      </div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: "10px", marginTop: "1rem", backgroundColor: "white", width: "100%" }}>
        <Button size="small" content="Reply" bgcolor='#E73838' colour="white" />
        <Button size="small" content="Note" bgcolor="white" colour="black" />
        <Button size="small" content="Reminder" bgcolor="white" colour="black" />
        <Button size="small" content="Shortcuts" bgcolor="white" colour="black" />
        <Button size="small" content="Helpdesk" bgcolor="white" colour="black" />
      </div>
      <div style={{ width: "100%", backgroundColor: "white" }}> <InputContainer /></div>
    </div>
  );
};

export default ChatRoom;
