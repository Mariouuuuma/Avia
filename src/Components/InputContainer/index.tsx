import React from'react'
import bold from '../../../src/Assets/Images/bold.png'
import italic from '../../Assets/Images/italic.png'
import underline from '../../Assets/Images/underline.png'
import Vector from '../../Assets/Images/Vector.png'
import clip from '../../Assets/Images/paperclip.png'
import imagev from '../../Assets/Images/image-v.png'
import link from '../../Assets/Images/link.png'
import u_grin from '../../Assets/Images/u_grin.png'
import send from '../../Assets/Images/send.png'
import './index.css'

export default function InputContainer() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '100%', marginTop:"1rem" }}>
          <input
            type="text"
            defaultValue="Send a message.."
            style={{ width: '100%' /**height: '50px'**/, padding: '0 50px', boxSizing: 'border-box' }}
          />
          <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '10px', display: 'flex', gap: '10px' }}>
           <button> <img src={u_grin} className='Grin Grin:hover'
            /></button>
      <button><img 
    src={send} className="Envoyer Envoyer:hover"
/></button>
             
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', width: '100%' }}>
          <button><img src={bold} className="bold bold:hover"
           /></button>
          <button><img src={italic} className="italic italic:hover"
           /></button>
          <button><img src={underline} className="underline underline:hover"></img></button>
          
         <button><img src={Vector} className="Vector Vector:hover" /></button> 
        <button> <img src={clip} className="clip clip:hover" /></button> 
        <button> <img src={imagev} className="imagev imagev:hover"/></button> 
          <button><img src={link} className="link link:hover"  /></button>
        </div>
      </div>
    );
  }
  