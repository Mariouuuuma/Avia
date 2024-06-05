import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useContext,
  useEffect,
} from "react";
import "./index.css";
import bold from "../../../../src/Assets/Images/bold.png";
import italic from "../../../Assets/Images/italic.png";
import underline from "../../../Assets/Images/underline.png";
import Vector from "../../../Assets/Images/Vector.png";
import clip from "../../../Assets/Images/paperclip.png";
import imagev from "../../../Assets/Images/image-v.png";
import link from "../../../Assets/Images/link.png";
import u_grin from "../../../Assets/Images/u_grin.png";
import send from "../../../Assets/Images/send.png";

import { v4 as uuidv4 } from "uuid";

import { MessengingContext } from "../../../Contexts/MessengingContext";
import { AuthContext } from "../../../Contexts/AuthContext";
import supabase from "../../../Utils/api";
import { SideBarContext } from "../../../Contexts/SideBarContext";
import { UUID } from "crypto";
import { User } from "@supabase/supabase-js";
declare module "uuid";

interface ChatMessage {
  message: string;
  receiverFN: string;
  receiverLN: string;
  id: UUID;
}
function generateRandomId() {
  return Math.floor(Math.random() * 100000000);
}

let globalResponseId = 0;

export default function InputContainerCli() {
  useContext(MessengingContext);
  const { setguestId, msgGuest } = useContext(MessengingContext);
  const [chatMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [newredmessage] = useState<boolean>(false);
  const { convName, setConvName, increment } = useContext(MessengingContext);
  const { clickedButtons, messageReclm, setMessageBot } =
    useContext(MessengingContext);
  const { Me } = useContext(MessengingContext);
  const generateConversationId = async () => {
    const storedConversationId = localStorage.getItem("conversationId");

    if (storedConversationId) {
      return parseInt(storedConversationId);
    } else {
      const newConversationId = generateRandomId();
      localStorage.setItem("conversationId", newConversationId.toString());

      return newConversationId;
    }
  };
  setguestId(conversationId);

  const handleMessageChangeCli = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    // Capture the current incremented value

    e.preventDefault();
    setMessageBot(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const uuid = user?.id;
    const lastEightDigits = uuid?.substring(uuid.length - 8);

    const conversationIdString = `${conversationId}`;

    localStorage.setItem("redbox", newredmessage.toString());
    const InsertMessage = async () => {
      globalResponseId += 1;
      const responseId = globalResponseId;

      console.log(message);
      const { error } = await supabase.from("Messages").insert({
        ConversationName: `conversation ${conversationId}`,
        Sender_id: clickedButtons ? lastEightDigits : conversationId,
        body: clickedButtons ? messageReclm : message,
        ResponseId: responseId,
      });

      if (error) {
        console.error("Erreur lors de l'insertion du message:", error.message);
        console.log(conversationIdString);
      } else {
        console.log("Message inséré avec succès!");
      }
    };
    console.log("last eight digits are", lastEightDigits);
    InsertMessage();
    setMessage("");
  };
  if (message === "" && increment !== 0) {
    setMessageBot(true);
  }
  useEffect(() => {
    if (message === "") {
      setMessageBot(true);
    } else {
      setMessageBot(false);
    }
  }, [message, setMessageBot]);
  useEffect(() => {
    const fetchConversationId = async () => {
      const conversationId = await generateConversationId();
      setConversationId(conversationId);
    };

    fetchConversationId();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.removeItem("conversationId");
    }, 30000);
    return () => clearTimeout(timeoutId);
  }, [conversationId]);

  useEffect(() => {
    if (conversationId) {
      InsertConversation();
    }
  }, [conversationId]);

  const InsertConversation = async () => {
    const { data, error } = await supabase
      .from("Conversations")
      .select("id")
      .eq("GuestIdentifier", conversationId)
      .single();

    if (data) {
      console.log(
        "Conversation existante ou erreur lors de la recherche:",
        error
      );
      return;
    }

    const { error: insertError } = await supabase.from("Conversations").insert({
      name: `conversation ${conversationId}`,
      GuestIdentifier: conversationId,
    });

    if (insertError) {
      console.error(
        "Erreur lors de l'insertion de la conversation:",
        insertError.message
      );
    } else {
      console.log("Conversation insérée avec succès!");
    }
  };

  setConvName(`conversation ${conversationId}`);

  const value = localStorage.getItem("redbox");

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ position: "relative", width: "100%", marginTop: "1rem" }}>
        <form onSubmit={handleSubmitForm} style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Send a message.."
            value={message}
            onChange={handleMessageChangeCli}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderColor: "transparent",
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
            <button className="buttonCli">
              <img src={u_grin} className="Grin" alt="Grin" />
            </button>
            <button className="buttonCli" type="submit">
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
        <button className="buttonCli">
          <img src={bold} className="bold" alt="Bold" />
        </button>
        <button className="buttonCli">
          <img src={italic} className="italic" alt="Italic" />
        </button>
        <button className="buttonCli">
          <img src={underline} className="underline" alt="Underline" />
        </button>
        <button className="buttonCli">
          <img src={Vector} className="Vector" alt="Vector" />
        </button>
        <button className="buttonCli">
          <img src={clip} className="clip" alt="Clip" />
        </button>
        <button className="buttonCli">
          <img src={imagev} className="imagev" alt="Image" />
        </button>
        <button className="buttonCli">
          <img src={link} className="link" alt="Link" />
        </button>
      </div>
    </div>
  );
}
