import React, {useRef} from "react";
import Button from './Button';

//the interface defines the props the component will accept
interface FileUploadProps {
    onFileSelected: (file: File | null) => void;
    acceptedFileTypes?: string[];
    // ^^ can give an array of strings of accepted file types (json, pdf, etc)
    buttonText: string;
    //customize button text
}

//functional react component
const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected, acceptedFileTypes, buttonText}) => {
    //create mutable reference to input type "file"
    const fileInputRef = useRef<HTMLInputElement>(null);
    //for when the user selects or deselects the file
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = event.target.files;
        //check if files have been selected for handling
        if(files && files.length > 0) {
            const file: File = files[0]; //only handling first file
            onFileSelected(file);
        } else {
            onFileSelected(null);
        }
    };

    //function to handle button click (file selection)
    const handleClick = () => {
        if(fileInputRef.current) {
            fileInputRef.current.click(); //trigger browser file selection dialog
        }
    };

    return (
        <div>
            <Button onClick={handleClick} text={buttonText}></Button>
            <input type='file'
                   accept={acceptedFileTypes ? acceptedFileTypes.join(','):undefined}
                   onChange={handleFileChange}
                   style={{display: 'none'}}
                   ref={fileInputRef} />
        </div>
    );
};

export default FileUpload;