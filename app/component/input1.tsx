import { ChangeEvent } from "react";

interface Input1Props{
    type? : string;
    id? : string;
    extraCss?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e:ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Input1({type = "text", id, extraCss, placeholder, onChange, onKeyDown, value} : Input1Props){
    return (
        <input 
            type={type}
            id={id}
            className={`border-b border-gray-600 pl-2  ${extraCss}`} 
            placeholder={placeholder} 
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={value}
            
            />

    );
}