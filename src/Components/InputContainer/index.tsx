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

import { MessengingContext } from "../../Contexts/MessengingContext";
import supabase from "../../Utils/api";
import { SideBarContext } from "../../Contexts/SideBarContext";
import { UUID } from "crypto";
declare module "uuid"; //ajoit condition à messagesent
let secondWord: any;
interface ChatMessage {
  message: string;
  receiverFN: string;
  receiverLN: string;
  id: UUID;
}
let lastMessage: any;
const storedConversationId = localStorage.getItem("conversationId");
console.log("value is", storedConversationId);

export default function InputContainer() {
  const uniqueId = uuidv4();
  const { setMessagesent, convName, IdReclamation } =
    useContext(MessengingContext);
  const { setmessageGuest } = useContext(MessengingContext);

  const { receiver, sender } = useContext(SideBarContext);
  const { messagesent, setmessageInbox, messageInbox } =
    useContext(MessengingContext);
  const [error, setError] = useState<string>("");
  const { Context } = useContext(MessengingContext);
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
  const storedIdReclam = localStorage.getItem("IdReclam");

  // Access the second word (index 1)
  if (convName !== null) {
    const words = convName?.split(" ");
    secondWord = words[1];
  }

  useEffect(() => {
    console.log("le context contient déjà:");

    const RespondToReclamation = async () => {
      try {
        // Step 1: Fetch the record to get the Context value
        const { data, error: fetchError } = await supabase
          .from("Reclamations")
          .select("Context")
          .eq("IdReclam", secondWord)
          .single(); // Assuming IdReclam is unique and will return a single record

        if (fetchError) {
          console.error("Error fetching data:", fetchError);
          return;
        }

        const contextValue = data?.Context;

        // Step 2: Update the record based on the Context value
        const { error: updateError } = await supabase
          .from("Reclamations")
          .update({
            state: contextValue === 1 ? lastMessage : "En cours de traitement",
          })
          .eq("IdReclam", secondWord);

        if (updateError) {
          console.error("Error updating data:", updateError);
        } else {
          console.log("Data updated successfully");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    RespondToReclamation();
  }, [messagesent, Context, IdReclamation]);

  const updateLastMessage = () => {
    setTimeout(() => {
      lastMessage = messagesent;
    }, 1000); // Delay of 1000 milliseconds (1 second)
  };

  // Call the function to update lastMessage after the delay
  updateLastMessage();
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
