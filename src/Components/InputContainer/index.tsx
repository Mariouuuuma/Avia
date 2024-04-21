import React, { ChangeEvent, FormEvent, useState,useContext } from 'react';
import './index.css';
import bold from '../../../src/Assets/Images/bold.png';
import italic from '../../Assets/Images/italic.png';
import underline from '../../Assets/Images/underline.png';
import Vector from '../../Assets/Images/Vector.png';
import clip from '../../Assets/Images/paperclip.png';
import imagev from '../../Assets/Images/image-v.png';
import link from '../../Assets/Images/link.png';
import u_grin from '../../Assets/Images/u_grin.png';
import send from '../../Assets/Images/send.png';
import {MessengingContext,MessengingProvider} from '../../Contexts/MessengingContext'
import {AuthContext} from '../../Contexts/AuthContext'
import supabase from '../../Utils/api';



export default function InputContainer () 
 {
const {setMessagesent}=useContext(MessengingContext)
const{messagesent}=useContext(MessengingContext)
const{currentuser}=useContext(AuthContext)
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
   
    setMessagesent(e.target.value)
  };

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const { data: insertData, error: insertError } = await supabase
    .from('AgentChats')
    .insert({
      name: "Nour Smadhi",
      OwnerId:currentuser?.id,
      message:messagesent
    });
    if (insertError) {
      console.error('Erreur lors de l\'ajout de l\'agent :', insertError.message);
      // Gérer les erreurs liées à l'ajout de l'agent dans la base de données
    } else {
      console.log('Agent ajouté avec succès :', insertData);
      // L'agent a été ajouté avec succès à la base de données
  
  };
  
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '100%', marginTop: '1rem' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="text"
            placeholder="Send a message.."
            onChange={handleInputChange}
        
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' , border:'none' }}
          />
          <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '10px', display: 'flex', gap: '10px' }}>
            <button  ><img src={u_grin} className="Grin" alt="Grin" /></button>
            <button type="submit" ><img src={send} className="Envoyer" alt="Send" /></button>
          </div>
        </form>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', width: '100%' }}>
        <button><img src={bold} className="bold" alt="Bold" /></button>
        <button><img src={italic} className="italic" alt="Italic" /></button>
        <button><img src={underline} className="underline" alt="Underline" /></button>
        <button><img src={Vector} className="Vector" alt="Vector" /></button>
        <button><img src={clip} className="clip" alt="Clip" /></button>
        <button><img src={imagev} className="imagev" alt="Image" /></button>
        <button><img src={link} className="link" alt="Link" /></button>
      </div>
    </div>
  );
};

 
