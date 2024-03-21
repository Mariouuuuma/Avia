import React from 'react'
import fleche from '../../Assets/Images/fleche.png'

export default function YellowInput() {
    return (
        <div 
            style={{
                display: 'flex',
                padding: '0px 20px',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                alignSelf: 'stretch',
            }}
        >
            <div 
                style={{
                    display: 'flex',
                    height: '90px',
                    padding: '10px 20px',
                    alignItems: 'flex-start',
                    gap: '10px',
                    alignSelf: 'stretch',
                    borderRadius: '8px',
                    background: '#FFF9E6',
                    width: '346px',
                }}
            >
                <input defaultValue="Write a private note" />
                <img 
                    src="url_de_votre_image.jpg" 
                    alt="Description de l'image" 
                    style={{
                        width: '20px',
                        height: '20px',
                        transform: 'rotate(90deg)',
                        position: 'absolute',
                        right: '20px',
                        bottom: '10px',
                    }} 
                />
                <img src={fleche}></img>
            </div>
        </div>
    );
}


