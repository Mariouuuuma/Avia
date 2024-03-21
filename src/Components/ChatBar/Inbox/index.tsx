import React from 'react';

type Color = string | "#ED3863" | "white"|"#7BC600";

interface NavbarProps {
  username: string;
  avatarUrl: string;
  MessageState: string;
  nowText: string;
  Message: string;
  bgcolor: Color;
  ButtonColor:Color;
}

const Inbox: React.FC<NavbarProps> = ({ username, avatarUrl, MessageState, nowText, Message, bgcolor,ButtonColor }) => {
  return (
    <div className="navbar bg-base-100 border border-gray-300 h-11 flex justify-between items-center w-73 rounded-lg px-15 py-14 gap-16" style={{ backgroundColor: bgcolor }}>
      <div className="flex items-center">
        <a className="btn btn-ghost">
          <img alt="Avatar" src={avatarUrl} className="w-10 rounded-full" />
        </a>
        <div className="ml-2 flex flex-col space-y-2">
          <span className="text-xs text-gray-700">{username}</span>
          <span className="text-xs text-gray-500">{Message}</span>
        </div>
      </div>
      <div className="ml-auto flex flex-col items-end">
        <span className="text-sm text-gray-700">{nowText}</span>
        <div className="mt-2">
          <div className="relative">
            <span className="absolute top-0 right-0 -mt-2 -mr-1 inline-flex items-center justify-center h-4 w-4 rounded-full text-white text-xs" style={{backgroundColor:ButtonColor}}>{MessageState}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;






      
    