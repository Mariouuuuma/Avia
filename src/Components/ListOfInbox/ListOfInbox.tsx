import React, { useState, useEffect, useContext } from "react";
import Inbox from "../../Components/ChatBar/Inbox/index";
import { SideBarContext } from "../../Contexts/SideBarContext";
import { SupabaseClient, PostgrestResponse } from "@supabase/supabase-js";
import supabase from "../../Utils/api";

interface ChatMessage {
  message: string;
  name: string;
  id: number;
}

export default function ListOfInbox() {
  const { inboxClicked, setInboxClicked } = useContext(SideBarContext);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const handleInboxClick = () => {
    setInboxClicked(!inboxClicked);

    console.log("Inbox clicked!");
  };

  useEffect(() => {
    fetchLatestChatMessages(supabase)
      .then((data) => setMessages(data))
      .catch((error) => console.error(error));
  }, []);

  async function fetchLatestChatMessages(
    supabase: SupabaseClient
  ): Promise<ChatMessage[]> {
    const query: string = `
      SELECT message, name AS name, id AS id, message AS message
      FROM AgentChats
      ORDER BY id DESC;
    `;

    const { data, error }: PostgrestResponse<any> = await supabase
      .from("AgentChats")
      .select(query);

    if (error) {
      console.error(
        "Erreur lors de la récupération des messages de chat:",
        error.message
      );
      return [];
    }

    return data.map((msg) => ({
      message: msg.message,
      name: msg.name,
      id: msg.id,
    }));
  }

  useEffect(() => {
    const channel = supabase.channel("room1");

    channel
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "AgentChats" },
        (payload) => {
          console.log("Change received!", payload);
          const newMessage = payload.new as ChatMessage;

          if (newMessage) {
            setMessages((prevMessages) => [
              {
                message: newMessage.message,
                name: newMessage.name,
                id: newMessage.id,
              },
              ...prevMessages,
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div>
      {messages.map((message) => (
        <Inbox
          key={message.id}
          username={message.name}
          Message={message.message}
          avatarUrl="bhvtcicg"
          MessageState="not read"
          nowText="now"
          ButtonColor="red"
        />
      ))}
    </div>
  );
}
