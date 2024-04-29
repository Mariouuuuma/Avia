import React, { ReactNode, useContext, useEffect, useState } from "react";
import NavBar from "../../../Components/NavBar/NavBar";
import InputContainer from "../../../Components/InputContainer";
import LeftMessage from "../../../Components/LeftMessage/LeftMessage";
import RightChatBubble from "../../../Components/RightChatBubble/RightChatBubble";
import { MessengingContext } from "../../../Contexts/MessengingContext";
import { SideBarContext } from "../../../Contexts/SideBarContext"; // Assuming SenderType is defined in SideBarContext
import supabase from "../../../Utils/api";
import image from "../../../Assets/Images/logoAvia.png";
import { createClient } from "@supabase/supabase-js";
import NavBarCli from "../NavBarCli/NavBarCli";
import "./index.css";

interface ChatMessage {
  message: string;
  receiverFN: string;
  receiverLN: string;
}

interface ChatRoomProps {
  children?: ReactNode;
  imageReceiver?: string;
}

const ChatRoomCli: React.FC<ChatRoomProps> = ({ children, imageReceiver }) => {
  const { messagesent } = useContext(MessengingContext);
  const { sender, receiver, inboxClicked } = useContext(SideBarContext);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("UserChats")
      .select("message, OwnerFirstName, OwnerLastName");

    if (data) {
      const formattedMessages: ChatMessage[] = data.map((msg: any) => ({
        message: msg.message,
        receiverFN: msg.OwnerFirstName,
        receiverLN: msg.OwnerLastName,
      }));
      setChatMessages(formattedMessages);
    }
  };

  useEffect(() => {
    const realtimeSubscription = supabase
      .channel("UserChats")
      .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
        console.log("Change received!", payload);
      })
      .subscribe();

    return () => {
      realtimeSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [messagesent]); // Re-fetch data whenever a new message is sent

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        borderRadius: "10px",
      }}
    >
      <NavBarCli status="Etudiant" Image={image} />
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {
          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              backgroundColor: "#F6F7FB",
            }}
          >
            <div style={{ animation: "fadeIn 2s ease-in-out" }}>
              <LeftMessage
                message="Bonjour et bienvenue sur le service de chat AviaHelper !
               Je suis ici pour vous aider à planifier votre voyage et répondre à toutes vos questions sur nos vols,
                services et destinations."
                ImageUrl={image}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "3rem",
                    marginTop: "1rem",
                    justifyContent: "center",
                  }}
                >
                  <button className="btn btn-outline btn-error">
                    Réclamation
                  </button>
                  <button
                    onClick={() =>
                      setShowAdditionalButtons(!showAdditionalButtons)
                    }
                    className="btn btn-outline btn-error"
                  >
                    Réservation de vols
                  </button>
                  <div>
                    {showAdditionalButtons && (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <button className="btn btn-outline btn-error">
                          Je veux faire une réservation
                        </button>
                        <button className="btn btn-outline btn-error">
                          ja veux annuler une réservation
                        </button>
                        <button className="btn btn-outline btn-error">
                          ja veux consulter ma réservation
                        </button>
                        <button className="btn btn-outline btn-error">
                          Puis je voir les vols disponibles?
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {chatMessages.map(
              (message, index) =>
                message.receiverFN === receiver.firstName ? (
                  <LeftMessage
                    key={index}
                    message={message.message}
                    ImageUrl="https://example.com/avatar.jpg"
                  />
                ) : message.receiverFN === sender.firstName ? (
                  <RightChatBubble
                    key={index}
                    message={message.message}
                    ImageUrl="https://example.com/avatar.jpg"
                  />
                ) : null // Handle unexpected message sender (optional)
            )}
          </div>
        }

        {/* Gap between chat and input */}
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "10px",
          marginBottom: "3rem",
        }}
      >
        <InputContainer />
      </div>
    </div>
  );
};
export default ChatRoomCli;
