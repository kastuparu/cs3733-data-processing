import React from 'react';
import FileUpload from "../components/FileUpload.tsx";

const HomePage = () => {
    //state to store selected file
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    //function called by FileUpload component when file is selected
    const handleFileSelected = (file: File | null) => {
        setSelectedFile(file); //update state with stored file
    }
    //placeholder for backend logic:
    const handleUpload = (file: File) => {
        if(file) {
            console.log(file.name);
        } else {
            console.log("no file upload");
        }
    }
    return (
        <div className="p-10 h-screen flex flex-col items-center justify-start">
            <h1 className="font-extrabold text-4xl pb-4 text-center">Home Page</h1>
            <FileUpload
                onFileSelected={handleFileSelected}
                acceptedFileTypes={['application/json']}
                buttonText={'Upload File'}/>
            {/*IF file has been selected*/}
            {selectedFile && (
                <div>
                    {/*display name of file and process*/}
                    <p>Selected File: {selectedFile?.name}</p>
                    <button onClick={() => handleUpload(selectedFile)} className="bg-black text-white rounded-lg px-5 py-1">Process and Upload</button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
