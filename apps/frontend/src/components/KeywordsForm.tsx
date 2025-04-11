import React, {useRef, useState} from "react";
import Button from "./Button";

//defines what the component will accept
interface KeywordsFormProps {
    onKeywordsSubmit: (keywords: string[]) => void;
    buttonText: string;
}

const KeywordsForm: React.FC<KeywordsFormProps> = ({
    onKeywordsSubmit,
    buttonText,
}) => {
    //use state to manage user input values
    const [inputValue, setInputValue] = useState('');

    //handle change event
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    
    //event handler for on submit --> this lets us process the keywords..
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); //prevent page reload
        const keywordsArray = inputValue.split(',');
        //process keywords: trim leading/trailing spaces, remove accidental empties
        const processedKeywords = keywordsArray
            .map((keyword) => keyword.trim())
            .filter((keyword) => keyword !== '');
        //call on submit provided by parent
        onKeywordsSubmit(processedKeywords);
        console.log(processedKeywords);
        //clear the input field
        setInputValue('');
    };
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col mt-5 w-full items-center">
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                className="border border-black w-"/>
            <Button type="submit" text={buttonText} />
        </form>
    );
        
}

export default KeywordsForm;