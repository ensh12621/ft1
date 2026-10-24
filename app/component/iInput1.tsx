import { ChangeEvent } from "react";

interface Input1Props{
    type? : string;
    id? : string;
    extraCss?: string;
    placeholder: string;
    value?: string;
    onChange?: (e:ChangeEvent<HTMLInputElement>) => void;
}

export default function Input1({type = "text", id, extraCss, placeholder, onChange, value} : Input1Props){
    return (
        <input 
            type={type}
            id={id}
            className={`border-b border-gray-600 pl-2  ${extraCss}`} 
            placeholder={placeholder} 
            onChange={onChange}
            value={value}
            
            />

    );
}