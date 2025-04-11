import React from 'react';
import FileUpload from "../components/FileUpload.tsx";
import Table from "../components/Table";
import KeywordsForm from "../components/KeywordsForm.tsx";

const HomePage = () => {
    //state to store selected file
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    //function called by FileUpload component when file is selected
    const handleFileSelected = (file: File | null) => {
        setSelectedFile(file); //update state with stored file
    }
    //placeholder for backend logic:
    const handleUpload = async (file: File | null) => {
        if(!file) {
            console.log("no file uploaded");
            return;
        }
        try {
            const formData = new FormData();
            //append file to object with field name
            //make sure filename matches backend expectation
            formData.append("jsonFile", file, 'jsonFile.json');
            const response = await fetch('/api/nobel-prize/upload', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log("Successfully uploaded");
                //reset selected file state
                setSelectedFile(null);
            } else {
                console.error('file upload failed');
                //handle error response from backend
                const errorData = await response.text();
                console.error('backend error: ', errorData);
            }
        } catch (error) {
            console.error('file upload error: ', error);
        }
    };

    //placeholder for our backend logic
    const handleKeywordsSubmit = (keywords: string[]) => {
        console.log(keywords);
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
            <Table/>
        </div>
    );
};

export default HomePage;