import React from "react";
import "../Button/index.css";

interface ButtonProps {
  size: "small" | "medium" | "large";
  content: string;
  bgcolor: "white" | "#E73838";
  colour: "white" | "black";
  onClick?: () => {};
}

const Button: React.FC<ButtonProps> = ({
  size,
  content,
  bgcolor,
  colour,
  onClick,
}) => {
  const buttonStyle = {
    padding:
      size === "large"
        ? "30px 40px"
        : size === "medium"
        ? "15px 30px"
        : "8px 10px",
    fontSize: size === "large" ? "20px" : size === "medium" ? "16px" : "12px",
    backgroundColor: bgcolor,
    border: "1px solid rgba(0, 0, 0, 0.1)",
    color: colour,
    borderRadius: "5px",
    cursor: "pointer",
    outline: "none",
    transition: "transform 0.2s",
  };

  const contentStyle: React.CSSProperties = {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    textTransform: "capitalize",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    transform: "scale(1.05)", // Agrandissement de 5% lors du survol
  };

  return (
    <button onClick={onClick} style={buttonStyle} className="Button">
      <span style={contentStyle}>{content}</span>
    </button>
  );
};

export default Button;
