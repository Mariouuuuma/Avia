import React from "react";
import "./Alert.css";

interface CustomAlertProps {
  severity: string;
  message: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ severity, message }) => {
  return <div className={`alert alert-${severity}`}>{message}</div>;
};

export default CustomAlert;
