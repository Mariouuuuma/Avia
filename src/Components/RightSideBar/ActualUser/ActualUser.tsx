import React from 'react';


interface Props {
  UserName: string;
  UrlAvatar: string;
  State: 'Available' | 'Unavailable';
  colour:'red'|'green' 
}

const ActualUser: React.FC<Props> = ({ UserName, UrlAvatar, State, colour }) => {
    return (
<div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px 0px', width: '100%', height: '11rem', border: '1px solid rgba(0, 0, 0, 0,1)' , flexDirection:"column"}}> 
  <img src={UrlAvatar} className="avatar" style={{ width: "4rem", height: "4rem", borderRadius: "50%" }} alt="User Avatar" />
  <div style={{ marginLeft: '10px' }}>
    <h1 className="username" style={{ color: "#212121", fontFamily: "Poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 500, lineHeight: "normal", textTransform: "capitalize", marginTop: '10px' }}>{UserName}</h1>
    <h2 className="state" style={{ color: colour, marginTop: '12px' }}>{State}</h2>
  </div>
</div>
    )
}
  

      




export default ActualUser;
