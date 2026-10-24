
interface ColorButton1Props{
    onClick?: () => void;
    value: string;
    extraCss: string;
}

export default function Button1({onClick, value, extraCss} : ColorButton1Props){
    return (
        <button
            onClick={onClick}
            className={`px-3 py-2 font-bold ${extraCss} cursor-pointer rounded-sm shadow-lg`}>
                {value}
        </button>
    );
}