

export default function createFilters(searchResults, setFilteredProfiles) {
    const endpoint = "http://127.0.0.1:5000/create-filters?"

    const jobtitles = searchResults.map((result) => 
        result.jobtitle
    )

    // RETURN: {junior: [associate, analyst], senior: [partner, manager]}



    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            searchResults,
        })
    })
}