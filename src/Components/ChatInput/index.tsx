import React from 'react'
import plus from '../../Assets/Images/circle.png'
export default function SendInput({ValeurParDefaut}:{ValeurParDefaut:string}){
    return(
       <div style={{ display: "flex",
       alignItems: "center",
       gap: "15px",
       backgroundColor: "#F5F7F9",
       padding:"10px",
       borderRadius: "8px",
       border: "1px solid #E5E7EB",
      width:"386px",
    height:"37px"}}
><img src={plus}></img>
        <input
       type="text"
       defaultValue={ValeurParDefaut}
       style={{ width: '346px', height:'21px',alignItems:'center'}}
              
     />
      
     </div> 
    )
}