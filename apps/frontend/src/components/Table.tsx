import React, {useState} from 'react';
import KeywordsForm from "./KeywordsForm.tsx";

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
        setSearchResults(null); //clear prev results
        if (keywords.length > 0) {
            const allResults: Winner[][] = [];
            let hasError = false;

            for(const keyword of keywords) {
                // const searchUrl = '${backendSearchUrl}/${keyword}';
                const searchUrl = `/api/nobel-prize/search-prizes/${keyword}?keyword`;

                try {
                    const response = await fetch(searchUrl);
                    if(response.ok) {
                        const data: Winner[] = await response.json();
                        allResults.push(data);
                    } else if(response.status === 404) {
                        console.log('no results for keyword ', keyword);
                    } else {
                        console.error('failed to fetch data for keyword ', keyword);
                        hasError = true;
                        break;
                    }
                } catch(error) {
                    console.error('error while fetching data: ', error);
                    hasError = true;
                    break;
                }
            }

            if(!hasError) {
                const combinedResults = allResults.flat();
                setSearchResults(combinedResults);
            } else {
                setSearchResults(null);
            }
        } else {
            console.log('no keywords provided for search');
            setSearchResults([]);
        }

    }

    return(
        <div className="w-full mx-auto text-center flex flex-col">
            <p>Search Nobel Prizes by Keyword</p>
            <KeywordsForm onKeywordsSubmit={handleKeywordsSubmit} buttonText={"Submit"}/>
            <p>Search Results:</p>
            {searchResults === null && <p>Searching...</p>}
            {searchResults && searchResults.length === 0 && <p>no results found for given keywords.</p>}
            {searchResults && searchResults.length > 0 && (
                <div className="w-full mx-auto text-start">
                    <ul>
                        {searchResults.map((winner) => (
                            <li key={winner.id}>
                                <strong>{winner.firstName} {winner.lastName}</strong> - {winner.prize.year} {winner.prize.category} (Motivation: {winner.motivation})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

};

export default Table;