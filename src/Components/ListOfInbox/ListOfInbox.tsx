import React, { useState, useEffect, useContext } from "react";
import Inbox from "../../Components/ChatBar/Inbox/index";
import { SideBarContext } from "../../Contexts/SideBarContext";
import { SupabaseClient, PostgrestResponse } from "@supabase/supabase-js";
import supabase from "../../Utils/api";
import { createClient } from "@supabase/supabase-js";

import { User } from "@supabase/supabase-js";
import { UUID } from "crypto";
let listofmessages: AgentChats[] | null = null;

interface AgentChats {
  id: number;
  name: string;
  message: string;
  ownerfirstname: string;
  ownerlastname: string;
  senderuid: UUID;
  updatedat: string;
}

export default function ListOfInbox() {
  const { inboxClicked, setInboxClicked, setReceiver } =
    useContext(SideBarContext);
  const [listofmessages, setListOfMessages] = useState<AgentChats[] | null>(
    null
  );

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("AgentChats")
          .select("*")
          .order("name")
          .order("UpdatedAt", { ascending: false });

        if (error) {
          console.error("Error fetching chat messages:", error);
          return;
        }

        // Créer un objet pour stocker les derniers messages par nom
        const lastMessagesByNames: { [name: string]: AgentChats } = {};

        // Parcourir les données et stocker les derniers messages par nom
        data.forEach((message) => {
          if (!lastMessagesByNames[message.name]) {
            lastMessagesByNames[message.name] = message;
          }
        });

        // Convertir l'objet en tableau
        const lastMessages = Object.values(lastMessagesByNames);

        // Mettre à jour l'état avec les derniers messages
        setListOfMessages(lastMessages);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchChatMessages();
  }, []);

  return (
    <div>
      {listofmessages &&
        listofmessages.map((message) => (
          <Inbox
            key={message?.id}
            username={message?.name}
            Message={message?.message}
            avatarUrl={`avatar_${message?.senderuid}`}
            MessageState="not read"
            nowText="now"
            ButtonColor="red"
            onClick={() => {
              setInboxClicked(!inboxClicked);
              // Assurez-vous que message.name est défini et non vide avant de diviser
              const [firstName, lastName] = message.name.split(" ");
              // Définissez Receiver avec les valeurs de firstName et lastName
              setReceiver({ firstName: firstName, lastName: lastName });
            }}
          />
        ))}
    </div>
  );
}
