import React from 'react';

interface ButtonProps {
  size: 'small' | 'medium' | 'large';
  content: string;
  bgcolor: string;
  colour: string;
}

const Button: React.FC<ButtonProps> = ({ size, content, bgcolor, colour }) => {
  const buttonStyle = {
    padding: size === 'large' ? '15px 30px' : size === 'medium' ? '10px 20px' : '5px 10px',
    fontSize: size === 'large' ? '20px' : size === 'medium' ? '16px' : '12px',
    backgroundColor: bgcolor,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    color: colour,
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none',
  };
  const contentStyle: React.CSSProperties = {
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    textTransform: 'capitalize',
  };
  

  return (
    <button style={buttonStyle}>
      <span style={contentStyle}>{content}</span>
    </button>
  );
};

export default Button;

