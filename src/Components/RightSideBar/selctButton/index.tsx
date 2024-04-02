import React from 'react';

// Définir le type de l'URL de l'image
type ImageUrl = string;

export default function SelectButton({ 
    UrlImage1, 
    UrlImage2, 
    UrlImage3, 
    Name, 
    OperatorName1, 
    OperatorName2, 
    OperatorName3 
}: { 
    UrlImage1: ImageUrl, 
    UrlImage2: ImageUrl, 
    UrlImage3: ImageUrl,
    Name: string,
    OperatorName1: string,
    OperatorName2: string,
    OperatorName3: string 
}) {
    return (
        <div  style={{
            backgroundColor: '#F5F7F9',
            display: "flex",
            width: "100%",  
            padding: "2rem ",
            justifyContent: "space-between",
            alignItems: "center",
            
        }}>
            
        <select style={{width:"100%" ,  backgroundColor: '#F5F7F9'}}>
            <option disabled selected>{Name}</option>
            <option>{UrlImage1} {OperatorName1}</option>
            <option>{UrlImage2} {OperatorName2}</option>
            <option>{UrlImage3} {OperatorName3}</option>   
        </select>
        </div>

    )
    
    }

