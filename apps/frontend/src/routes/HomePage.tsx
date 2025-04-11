import React from 'react';
import FileUpload from "../components/FileUpload.tsx";

const HomePage = () => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    //function called by FileUpload component when file is selected
    const handleFileSelected = (file: File | null) => {
        setSelectedFile(file); //update state with stored file
        console.log(file?.name);
    }

    //TODO: placeholder for backend logic:
    const handleUpload = async (file: File | null) => {
        if(file) {
            console.log(file.name);
        } else {
            console.log("no file");
        }
    };

    return (
        <div className="p-10">
            <h1 className="font-extrabold text-4xl pb-4 text-center">Home Page</h1>
            <FileUpload
                onFileSelected={handleFileSelected}
                acceptedFileTypes={['application/json']}
                buttonText={'Upload File'}/>
        </div>
    );
};

export default HomePage;
