import React, { useContext, useState } from 'react';
//import { SideBarContext } from '../../../Contexts/SideBarContext';
import { AuthContext } from '../../../Contexts/AuthContext';
import supabase from '../../../Utils/api';
import { SideBarContext } from '../../../Contexts/SideBarContext';

type Color = string | "#ED3863" | "white" | "#7BC600";
type ClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

interface InboxProps {
  username: string;
  avatarUrl: string;
  MessageState: string;
  nowText: string;
  Message: string;
  ButtonColor: Color;
}

const Inbox: React.FC<InboxProps> = ({ username, avatarUrl, MessageState, nowText, Message, ButtonColor }) => {
  const [bgcolor, setBgColor] = useState<string>('');
  const { currentuser } = useContext(AuthContext);
  const { searchTerm } = useContext(SideBarContext);
  const { inboxClicked, setInboxClicked } = useContext(SideBarContext);
 const {receiver,setReceiver, setSender } = useContext(SideBarContext);
  const [err, setErr] = useState<boolean>(false);

  const handleInboxClick = async () => {
    const [firstName, lastName] = searchTerm.split(' ');
console.log(searchTerm)
    try {
      setInboxClicked(!inboxClicked); // Inverser l'état du clic de l'Inbox
      console.log('Inbox clicked!');
 

      // Requête pour rechercher un utilisateur par prénom et nom
      const { data: userData, error: userError } = await supabase
        .from('Agents')
        .select()
        .ilike('firstName', receiver.firstName)
        .ilike('lastName', receiver.lastName);

      if (userError) {
        console.error('Erreur lors de la recherche de l\'utilisateur :', userError.message);
        setErr(true);
      } else {
        if (userData && userData.length > 0) {
          // Utilisateur trouvé, utilisez le premier résultat
          setReceiver(userData[0]);
          console.log('Utilisateur trouvé :', userData[0]);
        } else {
          // Aucun utilisateur trouvé
          setReceiver(null);
          console.log('Aucun utilisateur trouvé.');
        }
      }

      // Requête pour rechercher l'expéditeur par e-mail actuel de l'utilisateur connecté
      /*const { data: senderData, error: senderError } = await supabase
        .from('Agents')
        .select('firstName, lastName')
        .eq('Email', currentuser?.email);

      if (senderError) {
        // Gérer spécifiquement les erreurs de type PostgrestError
        console.error('Erreur lors de la recherche de l\'expéditeur :', senderError);
        setErr(true);
      } else {
        if (senderData && senderData.length > 0) {
          // Expéditeur trouvé, utilisez le premier résultat
          setSender(senderData[0]);
          console.log('Sender:', senderData[0]);
        } else {
          // Aucun expéditeur trouvé
       
          console.log('Aucun expéditeur trouvé.');
        }
      }
    }*/ }
    catch (error) {
      console.error('Erreur lors du clic :', error);
      setErr(true);
    }
  }


  return (
    <div
      className="navbar bg-base-100 border border-gray-300 flex justify-between items-center w-73 rounded-lg px-15 py-14 gap-16"
      style={{ backgroundColor: bgcolor, cursor: 'pointer', transition: 'background-color 0.3s ease' }}
      onMouseEnter={() => setBgColor('#F0F1F3')}
      onMouseLeave={() => setBgColor('')}
      onClick={handleInboxClick}
    >
      <div className="flex items-center">
        <a className="btn btn-ghost">
          <img alt="Avatar" src={avatarUrl} className="w-10 rounded-full" />
        </a>
        <div className="ml-2 flex flex-col space-y-2">
          <span className="text-xs text-gray-700">{username}</span>
          <span className="text-xs text-gray-500">{Message}</span>
        </div>
      </div>
      <div className="ml-auto flex flex-col items-end">
        <span className="text-sm text-gray-700">{nowText}</span>
        <div className="mt-2">
          <div className="relative">
            <span
              className="absolute top-0 right-0 -mt-2 -mr-1 inline-flex items-center justify-center h-4 w-4 rounded-full text-white text-xs"
              style={{ backgroundColor: ButtonColor }}
            >
              {MessageState}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;






      
    