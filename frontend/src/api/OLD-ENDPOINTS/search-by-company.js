
export default function SearchByCompany(company, setSearchResults) {

    const Endpoint = "http://127.0.0.1:5000"
    const companyEndpoint = `${Endpoint}/search-by-company?`


    const queryParams = new URLSearchParams({company}).toString();

    fetch(`${companyEndpoint + queryParams}`)
        .then((res) => res.json())
        .then((data) => {
            const recievedData = data.search_results
            setSearchResults(recievedData)
        }).catch((err) => {
            console.error("Error fetching people by company:", err);
        })
}