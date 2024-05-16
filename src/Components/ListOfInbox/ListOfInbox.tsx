import React, { useState, useEffect, useContext } from "react";
import Inbox from "../../Components/ChatBar/Inbox/index";
import { SideBarContext } from "../../Contexts/SideBarContext";
import { SupabaseClient, PostgrestResponse } from "@supabase/supabase-js";
import supabase from "../../Utils/api";
import { createClient } from "@supabase/supabase-js";

import { User } from "@supabase/supabase-js";
import { UUID } from "crypto";
import { MessengingContext } from "../../Contexts/MessengingContext";
let listofmessages: Chats[] | null = null;

interface Chats {
  id: number;
  ConversationName: string;
  body: string;
  created_at: string;
}

export default function ListOfInbox() {
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

        // Si les données existent
        if (data && data.length > 0) {
          // Créer un objet pour stocker les derniers messages par nom de conversation
          const lastMessagesByConversation: { [name: string]: Chats } = {};

          // Parcourir les données et stocker les derniers messages par nom de conversation
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

          // Convertir l'objet en tableau
          const lastMessages = Object.values(lastMessagesByConversation);

          // Trier les derniers messages par date de création décroissante
          lastMessages.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );

          // Mettre à jour les états
          setListOfMessages(lastMessages);

          // Obtenir les conversations distinctes
          const distinctConversations = Array.from(
            new Set(data.map((message) => message.ConversationName))
          );

          // Mettre à jour la dernière conversation
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

  return (
    <div>
      {listofmessages &&
        listofmessages.map((message) => {
          // Déterminer si la conversation est sélectionnée ou non
          const isSelected = message.ConversationName === selectedConversation;

          const backgroundColor = inboxClicked ? "white" : "#FFEFEF";

          return (
            <Inbox
              key={message?.id}
              username={message?.ConversationName}
              Message={message?.body}
              avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNVi9cbmMkUabLiF_3kfI94qngwPIM4gnrztEUv6Hopw&s"
              MessageState="not read"
              nowText="now"
              ButtonColor="red"
              onClick={() => {
                setInboxClicked(!inboxClicked);
                setSelectedConversation(message.ConversationName);
              }}
            />
          );
        })}
    </div>
  );
}
