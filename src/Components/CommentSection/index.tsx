import React from 'react';
import threedots from '../../Assets/Images/threedots.png'

type Color = string | "#ED3863" | "white"|"#7BC600";

interface NavbarProps {
  username: string;
  avatarUrl: string;
  date: string;
  Message: string;
  
}

const CommentElement: React.FC<NavbarProps> = ({ username, avatarUrl, date, Message }) => {
  return (
    <div style={{
      display: 'flex',
      padding: '15px 20px 10px 20px',
      alignItems: 'flex-start',
      gap: '10px',
      width:"386px",
      height:"115px",
      border: '1px solid rgba(0, 0, 0, 0.1)'
  }}>
      <div className="flex items-center">
        <a className="btn btn-ghost">
          <img alt="Avatar" src={avatarUrl} style={{width:'45px', height:'45px',borderRadius:'48px'}} />
        </a>
        <div className="ml-2 flex flex-col space-y-2">
          <span className="text-xs text-gray-700">{username}</span>
          <span className="text-xs text-gray-500">{Message}</span>
        </div>
      </div>
      <div className="ml-auto flex flex-col items-end">
        <div style={{display:"flex", flexDirection:"row"}}>
            
        <span className="text-sm text-gray-700">{date}</span>
        <img src={threedots} style={{width:"18px", height:"18px", flexShrink:"0"}}></img>
        </div>


        <div className="mt-2">
          <div className="relative">
            <span className="absolute top-0 right-0 -mt-2 -mr-1 inline-flex items-center justify-center h-4 w-4 rounded-full text-white text-xs"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentElement;
