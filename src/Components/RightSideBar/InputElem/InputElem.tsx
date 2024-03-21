import React from 'react';

interface Props {
  Name: string;
  UrlImage:string;
}

const InputElem: React.FC<Props> = ({ Name,UrlImage }) => {
  return (
    <div style={{
      display: 'flex',
      padding: '0px 20px',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'stretch',
      width:"386px",
      height:"40px"
  }}>
      <img src={UrlImage} style={{width: "40px",
height: "40px",
flexShrink:"0",
borderRadius:"40px"}}alt="Avatar" />
      <h3>{Name}</h3>
      <div style={{
  display: "flex",
  width: "91px",
  height: "37px",
  padding: "10px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  color: "var(--Other-Pink, #ED3863)",
  textAlign: "center",
  fontFamily: "Poppins",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  textTransform: "capitalize"
}}>
 <div style={{
    display: 'flex',
    width: '91px',
    height: '37px',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '6px',
    border: '1px solid var(--Other-Pink, #ED3863)'
}}>
  <p style={{
  color: "var(--Other-Pink, #ED3863)",
  textAlign: "center",
  fontFamily: "Poppins",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  textTransform: "capitalize"
}}> change</p>
  </div>
   
      </div>
    </div>
  );
}

export default InputElem;
