import complete from "../api/search-profiles";
import {useState} from 'react'

export default function SeeProfiles({profileList, setLinkedinProfiles}) {
    const [rawProfiles, setRawProfiles] = useState([])

    return (
        <>

        <button
        onClick={() => complete(profileList, setLinkedinProfiles, rawProfiles, setRawProfiles)}
        >
            Search profiles
        </button>

        </>

    )

}