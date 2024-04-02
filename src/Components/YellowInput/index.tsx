import React from 'react'
import fleche from '../../Assets/Images/fleche.png'
import './index.css'
export default function YellowInput() {
    return (
        <div 
            style={{
                display: 'flex',
                padding: '0px 20px',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                alignSelf: 'stretch',
            }}
        >
            <div 
                style={{
                    display: 'flex',
                  
                    padding: '10px 20px',
                    alignItems: 'flex-start',
                
                    alignSelf: 'stretch',
                    borderRadius: '8px',
                    background: '#FFF9E6',
                    width: '100%',
                }}
            >
                <input defaultValue="Write a private note" />
               
               
                <button><img src={fleche}></img></button>
            </div>
        </div>
    );
}


