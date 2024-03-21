import React, { useState } from 'react';
import italic from '../../Assets/Images/italic.png'
import Vector from '../../Assets/Images/Vector.png'
import link from '../../Assets/Images/link.png'
import u_grin from '../../Assets/Images/u_grin.png'
import underline from '../../Assets/Images/underline.png'
import imagev from '../../Assets/Images/image-v.png'
import bold from '../../Assets/Images/bold.png'
import clip from '../../Assets/Images/paperclip.png'
import send from '../../Assets/Images/sent.png'

 
export default function ChatTools() {
    return (
        
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        width: '1028px',
        height: '32px',
        
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={bold} alt="Bold" />
          <img src={italic} alt="Italic" />
          <img src={underline} alt="Underline" />
          <img src={Vector} alt="Vector" />
          <img src={clip} alt="Clip" />
          <img src={imagev} alt="Image" />
          <img src={link} alt="Link" />
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={u_grin} alt="Grin" />
          <img src={send} alt="Sent" />
        </span>
        
      </div>
    );
  }
  