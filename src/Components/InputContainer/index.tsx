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
import {
  MessengingContext,
  MessengingProvider,
} from "../../Contexts/MessengingContext";
import { AuthContext } from "../../Contexts/AuthContext";
import supabase from "../../Utils/api";
import { SideBarContext } from "../../Contexts/SideBarContext";

interface ChatMessage {
  message: string;
  receiverFN: string;
  receiverLN: string; // Assuming SenderType is an enum or string type for sender identification
}

export default function InputContainer() {
  const { setMessagesent } = useContext(MessengingContext);
  const { receiver, sender } = useContext(SideBarContext);
  const { messagesent } = useContext(MessengingContext);
  const { currentuser } = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [newmessage, setNewmessage] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessagesent(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!messagesent.trim()) {
      console.error("Le message est vide ou ne contient que des espaces.");
      return; // Arrêtez l'exécution si le message est vide ou ne contient que des espaces
    }
    try {
      const { data: insertData, error: insertError } = await supabase
        .from("AgentChats")
        .insert({
          name: `${receiver?.firstName} ${receiver?.lastName}`,
          OwnerFirstName: sender?.firstName,
          OwnerLastName: sender?.lastName,
          message: messagesent.trim(), // Utilisez messagesent après suppression des espaces avant et après
        });

      if (insertError) {
        setError(`Erreur lors de l'ajout du message : ${insertError.message}`);
      } else {
        // Réinitialiser le champ de message après l'insertion réussie
        setMessagesent(""); // Effacer le contenu de l'input
        setError(""); // Effacer les erreurs précédentes
        console.log("Message ajouté avec succès :");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du message :", error);
      // Gérer les erreurs générales liées à l'ajout du message
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ position: "relative", width: "100%", marginTop: "1rem" }}>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Send a message.."
            value={messagesent}
            onChange={handleInputChange}
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
            <button>
              <img src={u_grin} className="Grin" alt="Grin" />
            </button>
            <button type="submit">
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
        <button>
          <img src={bold} className="bold" alt="Bold" />
        </button>
        <button>
          <img src={italic} className="italic" alt="Italic" />
        </button>
        <button>
          <img src={underline} className="underline" alt="Underline" />
        </button>
        <button>
          <img src={Vector} className="Vector" alt="Vector" />
        </button>
        <button>
          <img src={clip} className="clip" alt="Clip" />
        </button>
        <button>
          <img src={imagev} className="imagev" alt="Image" />
        </button>
        <button>
          <img src={link} className="link" alt="Link" />
        </button>
      </div>
    </div>
  );
}
