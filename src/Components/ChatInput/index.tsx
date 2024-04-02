import React from 'react'
 
export default function SendInput({ValeurParDefaut}:{ValeurParDefaut:string}){
    return(
       <div style={{ display: "flex",
       alignItems: "center",
       /*gap: "15px",*/
       backgroundColor: "#F5F7F9",
       padding:"10px",
       borderRadius: "8px",
       border: "1px solid #E5E7EB",
      width:"100%",
    /*height:"37px"*/}}
> 
        <input
       type="text"
       defaultValue={ValeurParDefaut}
       style={{ width: '100%', height:'21px',alignItems:'center'}}
              
     />
      
     </div> 
    )
}