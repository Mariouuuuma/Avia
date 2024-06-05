import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useContext,
  useEffect,
} from "react";
import "./index.css";
import bold from "../../../src/Assets/Images/bold.png";
import italic from "../../Assets/Images/italic.png";
import underline from "../../Assets/Images/underline.png";
import Vector from "../../Assets/Images/Vector.png";
import clip from "../../Assets/Images/paperclip.png";
import imagev from "../../Assets/Images/image-v.png";
import link from "../../Assets/Images/link.png";
import u_grin from "../../Assets/Images/u_grin.png";
import send from "../../Assets/Images/send.png";

import { v4 as uuidv4 } from "uuid";

import {
  MessengingContext,
  MessengingProvider,
} from "../../Contexts/MessengingContext";
import { AuthContext } from "../../Contexts/AuthContext";
import supabase from "../../Utils/api";
import { SideBarContext } from "../../Contexts/SideBarContext";
import { UUID } from "crypto";
import { User } from "@supabase/supabase-js";
import { RedboxContext } from "../../Contexts/RedboxContext";
import sendEmail from "../../Functions/SendEmail";
declare module "uuid";

interface ChatMessage {
  message: string;
  receiverFN: string;
  receiverLN: string;
  id: UUID;
}
const storedConversationId = localStorage.getItem("conversationId");
console.log("value is", storedConversationId);

export default function InputContainer() {
  const uniqueId = uuidv4();
  const { setMessagesent, convName } = useContext(MessengingContext);
  const { setguestId, msgGuest, setmessageGuest } =
    useContext(MessengingContext);

  const { receiver, sender } = useContext(SideBarContext);
  const { messagesent, setmessageInbox, messageInbox } =
    useContext(MessengingContext);
  const { currentuser } = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [newmessage, setNewmessage] = useState<string>("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [response, setResponse] = useState("");
  const { redbox, setRedbox } = useContext(RedboxContext);
  const { guestId, messageReclm, setMessageReclm } =
    useContext(MessengingContext);
  const { clickedButtons, setClickedButtons } = useContext(MessengingContext);
  const { Me, setMe } = useContext(MessengingContext);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessagesent(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setmessageInbox(!messageInbox);
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const uuid = user?.id;
    const lastEightDigits = uuid?.substring(uuid.length - 8);
    setMe(lastEightDigits);
    if (!messagesent.trim()) {
      console.error("Le message est vide ou ne contient que des espaces.");
      return;
    }
    try {
      const { data: insertData, error: insertError } = await supabase
        .from("Messages")
        .insert({
          ConversationName: convName,
          body: messagesent.trim(),
          Sender_id: lastEightDigits,
        });
      if (insertData) {
        setmessageGuest(true);
      }

      if (insertError) {
        setError(`Erreur lors de l'ajout du message : ${insertError.message}`);
      } else {
        setMessagesent("");
        setError("");
        console.log("Message ajouté avec succès :");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du message :", error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ position: "relative", width: "100%", marginTop: "1rem" }}>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="Send a message.."
            value={messagesent}
            required
            style={{
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              border: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              right: "10px",
              display: "flex",
              gap: "10px",
            }}
          >
            <button className="buttonIC">
              <img src={u_grin} className="Grin" alt="Grin" />
            </button>
            <button className="buttonIC" type="submit">
              <img src={send} className="Envoyer" alt="Send" />
            </button>
          </div>
        </form>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
        }}
      >
        <button className="buttonIC">
          <img src={bold} className="bold" alt="Bold" />
        </button>
        <button className="buttonIC">
          <img src={italic} className="italic" alt="Italic" />
        </button>
        <button className="buttonIC">
          <img src={underline} className="underline" alt="Underline" />
        </button>
        <button className="buttonIC">
          <img src={Vector} className="Vector" alt="Vector" />
        </button>
        <button className="buttonIC">
          <img src={clip} className="clip" alt="Clip" />
        </button>
        <button className="buttonIC">
          <img src={imagev} className="imagev" alt="Image" />
        </button>
        <button className="buttonIC">
          <img src={link} className="link" alt="Link" />
        </button>
      </div>
    </div>
  );
}
