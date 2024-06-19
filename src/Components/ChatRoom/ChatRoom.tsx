import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { useLayoutEffect } from "react";

interface ChatMessage {
  body: string;
  id: number;
  ConversationName: string;
  sender_id: number;
}
interface ChatRoomProps {
  children?: ReactNode;
  imageReceiver?: string;
}
const ChatRoom: React.FC<ChatRoomProps> = ({ children, imageReceiver }) => {
  const { defaultConv, convName, guestId } = useContext(MessengingContext);
  const { sender, receiver, inboxClicked } = useContext(SideBarContext);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [defaultMessages, setdefaultMessages] = useState<ChatMessage[]>([]);

  const { user, setUser } = useContext(MessengingContext);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState(0);
  const previousConversationId = localStorage.getItem("previousConversationId");
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      const uuid = user?.id;

      if (uuid) {
        const lastEightDigits = uuid.substring(uuid.length - 8);
        const lastEightDigitsAsNumber = parseInt(lastEightDigits, 10);
        setResult(lastEightDigitsAsNumber);
        // Faites quelque chose avec lastEightDigitsAsNumber
      }
    };

    fetchData();

    return () => {};
  }, [setUser]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      const { data, error } = await supabase.from("Messages").select("*");

      if (data) {
        const formattedMessages: ChatMessage[] = data.map((msg: any) => ({
          body: msg.body,
          id: msg.id,
          ConversationName: msg.ConversationName,
          sender_id: msg.Sender_id,
        }));
        setChatMessages(formattedMessages);
      }
    };

    fetchChatMessages();

    const fetchChatMessagesDfeault = async () => {
      const { data, error } = await supabase
        .from("Messages")
        .select("*")
        .eq("ConversationName", `conversation ${previousConversationId}`);

      if (data) {
        const formattedMessages: ChatMessage[] = data.map((msg: any) => ({
          body: msg.body,
          id: msg.id,
          ConversationName: msg.ConversationName,
          sender_id: msg.Sender_id,
        }));
        setdefaultMessages(formattedMessages);
      }
    };

    fetchChatMessagesDfeault();

    const realtimeSubscription = supabase
      .channel("Messages")
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
      <NavBar
        status="Etudiant"
        Image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNVi9cbmMkUabLiF_3kfI94qngwPIM4gnrztEUv6Hopw&s "
      />
      <div
        style={{
          marginTop: "0.1rem",
          backgroundColor: "#F6F7FB",
          overflowY: "auto",
          height: "75vh",
          marginBottom: "-0.9rem",
        }}
      >
        {" "}
        {convName && inboxClicked && (
          <div>
            {chatMessages.map((message, index) => {
              if (
                message?.ConversationName === convName &&
                message?.sender_id === guestId
              ) {
                return (
                  <LeftMessage
                    key={index}
                    message={message.body}
                    ImageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNVi9cbmMkUabLiF_3kfI94qngwPIM4gnrztEUv6Hopw&s"
                  />
                );
              } else if (
                message?.ConversationName === convName &&
                message?.sender_id === result
              ) {
                return (
                  <RightChatBubble
                    key={index}
                    message={message.body}
                    ImageUrl={image}
                  />
                );
              }
            })}
          </div>
        )}
      </div>
      <div style={{ width: "100%", backgroundColor: "white" }}>
        {" "}
        <InputContainer />
      </div>
    </div>
  );
};

export default ChatRoom;
