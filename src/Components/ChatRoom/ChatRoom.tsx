import React, { ReactNode, useContext, useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Button from "../Button";
import InputContainer from "../InputContainer";
import LeftMessage from "../LeftMessage/LeftMessage";
import RightChatBubble from "../RightChatBubble/RightChatBubble";
import { MessengingContext } from "../../Contexts/MessengingContext";
import { SideBarContext } from "../../Contexts/SideBarContext"; // Assuming SenderType is defined in SideBarContext
import supabase from "../../Utils/api";
import { User } from "@supabase/supabase-js";
import image from "../../Assets/Images/logoAvia.png";
import { createClient } from "@supabase/supabase-js";
import { UUID } from "crypto";
interface ChatMessage {
  message: string;
  receiverFN: string;
  receiverLN: string;
  id: UUID;
}

interface ChatRoomProps {
  children?: ReactNode;
  imageReceiver?: string;
}
const ChatRoom: React.FC<ChatRoomProps> = ({ children, imageReceiver }) => {
  const { messagesent } = useContext(MessengingContext);
  const { sender, receiver, inboxClicked } = useContext(SideBarContext);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [User, setUser] = useState<User | null>();
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
      setUser(user);
      const { data, error } = await supabase
        .from("AgentChats")
        .select("message, OwnerFirstName, OwnerLastName,SenderUID");

      if (data) {
        const formattedMessages: ChatMessage[] = data.map((msg: any) => ({
          message: msg.message,
          receiverFN: msg.OwnerFirstName,
          receiverLN: msg.OwnerLastName,
          id: msg.SenderUID,
        }));
        setChatMessages(formattedMessages);
      }
    };

    fetchData();

    const realtimeSubscription = supabase
      .channel("AgentChats")
      .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
        console.log("Change received!", payload);
      })
      .subscribe();

    return () => {
      realtimeSubscription.unsubscribe();
    };
  }, [chatMessages]);

  return (
    <div>
      <NavBar status="Etudiant" Image={image} />
      {inboxClicked && (
        <div
          style={{
            backgroundColor: "#F6F7FB",
            overflowY: "auto",
            height: "29rem",
          }}
        >
          {chatMessages.map((message, index) => {
            if (message.receiverFN === receiver?.firstName) {
              return (
                <LeftMessage
                  key={index}
                  message={message.message}
                  ImageUrl="https://example.com/avatar.jpg"
                />
              );
            } else if (message.id === User?.id) {
              return (
                <RightChatBubble
                  key={index}
                  message={message.message}
                  ImageUrl="https://example.com/avatar.jpg"
                />
              );
            }
          })}
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginTop: "1rem",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <Button size="small" content="Reply" bgcolor="#E73838" colour="white" />
        <Button size="small" content="Note" bgcolor="white" colour="black" />
        <Button
          size="small"
          content="Reminder"
          bgcolor="white"
          colour="black"
        />
        <Button
          size="small"
          content="Shortcuts"
          bgcolor="white"
          colour="black"
        />
        <Button
          size="small"
          content="Helpdesk"
          bgcolor="white"
          colour="black"
        />
      </div>
      <div style={{ width: "100%", backgroundColor: "white" }}>
        {" "}
        <InputContainer />
      </div>
    </div>
  );
};

export default ChatRoom;
