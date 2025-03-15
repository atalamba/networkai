import { useState } from 'react'
import SearchByCompany from '../api/search-by-company'

export default function CompanySearch() {

    const [company, setCompany] = useState("")

    // THIS WILL CONTAIN THE RESULTS OF PEOPLE FOR THAT COMPANY
    const [searchResults, setSearchResults] = useState([])

    const [filteredProfiles, setFilteredProfiles] = useState({})
    /**
     * of the form:
     * {junior: john doe, joe todd...
     * senior: .....
     * }
     * goal: have filteredLinkedinProfiles
     * {junior: john doe: {his profile}, joe todd: {his profile}
     * senior: .....
     * }
     */

    return (
        <>
            <input
                style={{
                    fontSize: "1.2rem", padding: "12px", marginBottom: "10px", marginRight: "10px", width: "30%",
                    minWidth: "250px"
                }}
                placeholder="Please a company's linkedin url"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />

            <button
                onClick={() => SearchByCompany(company, setSearchResults)}
            >
                Search people by company
            </button>
            <div>
                People found:{" "} {searchResults.length}
            </div>
            
            {searchResults.map((person) => (
                <div key={person?.name}>{JSON.stringify(person)} </div>
            ))}

        </>

    )
}