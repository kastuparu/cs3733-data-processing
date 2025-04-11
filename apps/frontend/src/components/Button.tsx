import React from "react";

interface ButtonProps {
    onClick?: () => void;
    text: string;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps>=({onClick, text}) => {
    return(
        <button onClick={onClick} className="bg-black text-white rounded-lg px-5 py-1">{text}</button>
    );
};

export default Button;