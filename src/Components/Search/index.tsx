import React, { useState, useRef, useContext, useEffect } from "react";
import "./index.css"; // Fichier de style CSS pour le composant (facultatif)
import supabase from "../../Utils/api";
import Inbox from "../ChatBar/Inbox";
import { SideBarContext } from "../../Contexts/SideBarContext";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { receiver, setReceiver } = useContext(SideBarContext); // Utilisateur trouvé après la recherche
  const [err, setErr] = useState<boolean>(false);
  const { inboxClicked, setInboxClicked } = useContext(SideBarContext);

  const inputRef = useRef<HTMLInputElement>(null); // Référence à l'élément <input>

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setErr(true);
      return;
    }

    const [firstName, lastName] = searchTerm.split(" ");
    setErr(false);

    try {
      const { data, error } = await supabase
        .from("Agents")
        .select()
        .ilike("firstName", firstName)
        .ilike("lastName", lastName);

      if (data && data.length > 0) {
        setReceiver(data[0]);
      } else {
        setReceiver(null);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche :", (error as Error).message);
      setErr(true);
    }
  };
  useEffect(() => {
    console.log("receiver:", receiver);
  }, [receiver]);

  const handleInboxClick = () => {
    setInboxClicked(!inboxClicked); // Inverser l'état du clic de l'Inbox
    // Autres actions à exécuter lors du clic de l'Inbox
    console.log("Inbox clicked!");
  };
  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Rechercher un nom..."
          value={searchTerm}
          onChange={handleSearchChange}
          ref={inputRef} // Associer la référence à l'élément <input>
        />
        <button type="submit">Rechercher</button>
      </form>

      {/* Affiche le composant Inbox si un utilisateur est trouvé */}
      {receiver && (
        <Inbox
          username={`${receiver.firstName} ${receiver.lastName}`}
          avatarUrl="{user.avatarUrl || 'placeholder.jpg'}"
          MessageState="active"
          nowText="now"
          Message="none"
          ButtonColor="#ED3863"
        />
      )}
    </div>
  );
};

export default SearchBar;
