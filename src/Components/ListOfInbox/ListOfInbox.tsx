import React, { useContext } from 'react'
import Inbox from '../../Components/ChatBar/Inbox/index'
import { SideBarContext} from '../../Contexts/SideBarContext'

export default function ListOfInbox(){
  const {inboxClicked,setInboxClicked}=useContext(SideBarContext)
  const handleInboxClick = () => {
    setInboxClicked(!inboxClicked); // Inverser l'état du clic de l'Inbox
    // Autres actions à exécuter lors du clic de l'Inbox
    console.log('Inbox clicked!');
  }
    return(
        <div>
        <Inbox
        username="John Doe"
        avatarUrl="https://www.benouaiche.com/wp-content/uploads/2018/12/homme-medecine-chirurgie-esthetique-dr-benouaiche-paris.jpg"
        MessageState="Unread"
        nowText="2 minutes ago"
        Message="Hello, how are you today?"
        ButtonColor="#ED3863"
         // Passer la fonction handleInboxClick à la prop handleClick
      />

      <Inbox
      username="John Doe"
      avatarUrl="https://www.benouaiche.com/wp-content/uploads/2018/12/homme-medecine-chirurgie-esthetique-dr-benouaiche-paris.jpg"
      MessageState="Unread"
      nowText="2 minutes ago"
      Message="Hello, how are you today?"
      ButtonColor="#ED3863"
 // Passer la fonction handleInboxClick à la prop handleClick
    />

    <Inbox
    username="John Doe"
    avatarUrl="https://www.benouaiche.com/wp-content/uploads/2018/12/homme-medecine-chirurgie-esthetique-dr-benouaiche-paris.jpg"
    MessageState="Unread"
    nowText="2 minutes ago"
    Message="Hello, how are you today?"
    ButtonColor="#ED3863"
     // Passer la fonction handleInboxClick à la prop handleClick
  />

  <Inbox
  username="John Doe"
  avatarUrl="https://www.benouaiche.com/wp-content/uploads/2018/12/homme-medecine-chirurgie-esthetique-dr-benouaiche-paris.jpg"
  MessageState="Unread"
  nowText="2 minutes ago"
  Message="Hello, how are you today?"
  ButtonColor="#ED3863"
  // Passer la fonction handleInboxClick à la prop handleClick
/>

        </div>
   
    )
  }