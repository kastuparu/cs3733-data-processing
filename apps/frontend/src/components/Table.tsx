import React, {useState} from 'react';
// import { Prize, Winner } from '@prisma/client';

interface Prize {
    id: number;
    year: number;
    category: string;
}

interface Winner {
    id: number;
    motivation: string;
    firstName: string | null;
    lastName: string | null;
    prizeId: number;
    prize: Prize;
}

const Table: React.FC = () => {
    const [searchResults, setSearchResults] = useState<Winner[] | null>(null);
    const handleKeywordsSubmit = async (keywords: string[]) => {
        if(keywords && keywords.length > 0) {
            console.log(keywords);
        }
    }

    return(
        <div className="w-full mx-auto text-center flex flex-col">

        </div>
    );

};

export default Table;