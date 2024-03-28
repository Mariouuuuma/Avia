import React from'react'
import ActualUser from './ActualUser/ActualUser'
import InputElem from './InputElem/InputElem'
import SelectButton from './selctButton'
import OneSegment from './Segments/OneSegment'
import SendInput from '../ChatInput'
import UserInfo from './UserInfo'
import YellowInput from '../YellowInput'
import CommentElement from '../CommentSection'
 

export default function RightSideBar() {
    return (
        <div style={{  maxWidth: "386px",
        maxHeight: "100%",
        overflowY: "auto"}}>
      
        
            <div style={{ marginBottom: "10px" }}>
                <ActualUser
                    UserName="John Doe"
                    UrlAvatar="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" 
                    State="Available"
                    colour="green"
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <SelectButton
                    UrlImage1="url_image_1.jpg"
                    UrlImage2="url_image_2.jpg"
                    UrlImage3="url_image_3.jpg"
                    Name="Assigned Operator"
                    OperatorName1="Operator 1"
                    OperatorName2="Operator 2"
                    OperatorName3="Operator 3"
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <InputElem Name='John Doe' UrlImage="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" ></InputElem>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <SelectButton
                    UrlImage1="url_image_1.jpg"
                    UrlImage2="url_image_2.jpg"
                    UrlImage3="url_image_3.jpg"
                    Name="Segments for Conversations"
                    OperatorName1="Option 1"
                    OperatorName2="Option 2"
                    OperatorName3="Option 3"
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                    width: "386px",
                    height: "78px"
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        alignSelf: 'stretch'
                    }}>
<OneSegment bgColour="#FEF0FF" content="Chat" colour="#FFA21E" />
            <OneSegment bgColour="#FEF0FF" content="Techn." colour="#EC23B4" />
                    </div>
                    <SendInput ValeurParDefaut='Add New Segment'></SendInput>
                </div>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <div style={{
                    display: 'flex',
                    width: '386px',
                    padding: '0px 20px',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                   <UserInfo 
    id={32644} 
    Name='Mariem Smadhi' 
    Mail='mariem.smadhi@example.com' 
    Phone={123456789} 
    CreatedAt='2023-01-15T08:00:00Z'
/>
                </div>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <SelectButton
                    UrlImage1="url_image_1.jpg"
                    UrlImage2="url_image_2.jpg"
                    UrlImage3="url_image_3.jpg"
                    Name="Private Note"
                    OperatorName1="Option 1"
                    OperatorName2="Option 2"
                    OperatorName3="Option 3"
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <YellowInput></YellowInput>
            </div>
            <div style={{ marginBottom: "10px" }}>
            <CommentElement 
    username='JohnDoe123' 
    avatarUrl="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
    date="2024-03-20T10:30:00Z" 
    Message='Bonjour, je suis un commentaire.'
/>
<CommentElement 
    username='JaneSmith456' 
    avatarUrl="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
    date="2024-03-20T11:45:00Z" 
    Message='Cest un autre commentaire intéressant.'
/>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <SelectButton
                    UrlImage1="url_image_1.jpg"
                    UrlImage2="url_image_2.jpg"
                    UrlImage3="url_image_3.jpg"
                    Name="Shared Images"
                    OperatorName1="Operator 1"
                    OperatorName2="Operator 2"
                    OperatorName3="Operator 3"
                />
            </div>
        </div>
    )
}
