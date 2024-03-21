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

export default function InputContainer() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '1028px' }}>
          <input
            type="text"
            defaultValue="Send a message.."
            style={{ width: '100%', height: '50px', padding: '0 50px', boxSizing: 'border-box' }}
          />
          <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '10px', display: 'flex', gap: '10px' }}>
            <img src={u_grin} 
            />
            <img src={send} 
             />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', width: '100%' }}>
          <img src={bold} 
           />
          <img src={italic}
           />
          <img src={underline} 
          />
          <img src={Vector}  />
          <img src={clip}  />
          <img src={imagev} />
          <img src={link}  />
        </div>
      </div>
    );
  }
  