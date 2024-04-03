import React from 'react';
import threedots from '../../Assets/Images/threedots.png'

 

interface CommentElementProps {
  username: string;
  avatarUrl: string;
  date: string;
  Message: string;
}

const CommentElement: React.FC<CommentElementProps> = ({ username, avatarUrl, date, Message }) => {
  return (
    <div className="flex items-start w-full border border-gray-200 rounded p-4 mb-4">
      <div className="flex items-center">
        <a className="btn btn-ghost">
          <img alt="Avatar" src={avatarUrl} className="w-12 h-12 rounded-full" />
        </a>
        <div className="ml-4 flex flex-col space-y-2">
          <div style={{display:"flex" ,gap:"0.3rem"}}>
          <span className="text-sm text-gray-700" style={{marginRight:"1rem",marginLeft:"-1rem"}}>{username}</span>
          <div style={{display:"flex",gap:"0.2rem"}}>
      <span className="text-sm text-gray-700 " style ={{fontSize:"0.6rem"}}>{date}</span></div>
      <div className="ml-auto flex items-center">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 20 20" fill="currentColor">
              <circle cx="10" cy="5" r="1" />
              <circle cx="10" cy="10" r="1" />
              <circle cx="10" cy="15" r="1" />
            </svg>
          </div>
        </div>
      </div>
          </div>
    
         

          <span className="text-sm text-gray-500">{Message}</span>
        </div>
      </div>
 
       
    
    </div>
  );
};

export default CommentElement;

