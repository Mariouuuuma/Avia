import React, { useState, useEffect, useContext } from "react";
import Inbox from "../../Components/ChatBar/Inbox/index";
import { SideBarContext } from "../../Contexts/SideBarContext";
import supabase from "../../Utils/api";
import { MessengingContext } from "../../Contexts/MessengingContext";

interface Chats {
  id: number;
  ConversationName: string;
  body: string;
  created_at: string;
}

export default function ArchivedChats() {
  const { setClicked, conversations, ArchiveClicked, clickArchive } =
    useContext(SideBarContext);
  const { inboxClicked, setInboxClicked, setReceiver } =
    useContext(SideBarContext);
  const [listofmessages, setListOfMessages] = useState<Chats[] | null>(null);
  const { redbox, setRedbox } = useContext(MessengingContext);
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
  });
  return (
    <div>
      <h2>Archived Messages</h2>
      {listofmessages &&
        listofmessages.map((message) => {
          // Vérifier& si message.ConversationName correspond à userChat
          if (
            conversations.includes(message.ConversationName) &&
            ArchiveClicked
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
                type="Unarchive chat"
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
