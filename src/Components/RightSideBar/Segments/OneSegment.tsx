import React from 'react'


export default function OneSegment({ bgColour, content, colour }: { bgColour: "#FEF0FF" | "#FEF0FF"; content: string; colour: "#EC23B4" | "#FFA21E" }) {
    return (
        <div style={{
            display: 'flex',
            height: '31px',
            backgroundColor: bgColour,
            padding: '10px',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            gap: '10px',
        }}> 
            <div style={{
                color: colour,
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                textTransform: "capitalize"
            }}>
                {content}
            </div>
        </div>
    );
}
