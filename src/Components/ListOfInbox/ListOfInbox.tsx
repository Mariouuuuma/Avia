import React, { useState, useEffect, useContext } from "react";
import Inbox from "../../Components/ChatBar/Inbox/index";
import { SideBarContext } from "../../Contexts/SideBarContext";
import supabase from "../../Utils/api";

interface Chats {
  id: number;
  ConversationName: string;
  body: string;
  created_at: string;
}

export default function ListOfInbox() {
  const { ArchiveClicked, conversations, unreadOnes, UnRead } =
    useContext(SideBarContext);
  const { inboxClicked, setInboxClicked, setReceiver } =
    useContext(SideBarContext);
  const [listofmessages, setListOfMessages] = useState<Chats[] | null>(null);
  const [lastMessageConversation, setLastMessageConversation] = useState<
    string | null
  >(null);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("Messages")
          .select("*")
          .order("ConversationName")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching chat messages:", error);
          return;
        }

        if (data && data.length > 0) {
          const lastMessagesByConversation: { [name: string]: Chats } = {};

          data.forEach((message) => {
            if (
              !lastMessagesByConversation[message.ConversationName] ||
              new Date(message.created_at) >
                new Date(
                  lastMessagesByConversation[
                    message.ConversationName
                  ].created_at
                )
            ) {
              lastMessagesByConversation[message.ConversationName] = message;
            }
          });
          const lastMessages = Object.values(lastMessagesByConversation);

          lastMessages.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );

          setListOfMessages(lastMessages);

          const distinctConversations = Array.from(
            new Set(data.map((message) => message.ConversationName))
          );

          setLastMessageConversation(distinctConversations[0]);
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchChatMessages();
    const realtimeSubscription = supabase
      .channel("Messages")
      .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
        console.log("Change received!", payload);
      })
      .subscribe();

    return () => {
      realtimeSubscription.unsubscribe();
    };
  }, [listofmessages]);

  const userChat = localStorage.getItem("archivedchat");
  return (
    <div>
      {listofmessages &&
        listofmessages.map((message) => {
          const backgroundColor = inboxClicked ? "white" : "#FFEFEF";

          if (
            !conversations.includes(message.ConversationName) &&
            !unreadOnes.includes(message.ConversationName) &&
            !ArchiveClicked &&
            !UnRead
          ) {
            // Si oui, afficher le composant Inbox
            return (
              <Inbox
                key={message?.id}
                username={message?.ConversationName}
                Message={message?.body}
                avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNVi9cbmMkUabLiF_3kfI94qngwPIM4gnrztEUv6Hopw&s"
                MessageState="not read"
                nowText="now"
                type="Archive Chat"
                type2="Mark as unread"
                ButtonColor="red"
                onClick={() => {
                  setInboxClicked(!inboxClicked);
                  setSelectedConversation(message.ConversationName);
                }}
              />
            );
          } else {
            // Sinon, ne rien afficher
            return null;
          }
        })}
    </div>
  );
}
