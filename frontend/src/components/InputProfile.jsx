import { useEffect, useState } from 'react'
import complete from "../api/search-profiles";


export default function InputProfile({ profileList, setProfileList, setLinkedinProfiles }) {

    // profile link goes here
    const [currentPerson, setCurrentPerson] = useState("")

    const addProfile = () => {
        const newProfileList = [...profileList, currentPerson]

        setProfileList(newProfileList)

        setCurrentPerson("")
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "100%" }}>
                    <h2>Profile Link</h2>


                    <input
                        style={{
                            fontSize: "1.2rem", padding: "12px", marginBottom: "10px", marginRight: "10px", width: "30%",
                            minWidth: "250px"
                        }}
                        placeholder="Profile Link"
                        value={currentPerson}
                        onChange={(e) => setCurrentPerson(e.target.value)}
                    />


                </div>

               
                <button
                    onClick={() => addProfile()}
                >Send</button>

                <button
                    onClick={() => setProfileList([])}
                >
                    Clear
                </button>


            </div>

            <div>
                {profileList.length > 0 && <strong>Current Profiles:</strong>}
                {profileList.map((profile, index) =>
                    <div
                        key={index}
                    >
                        {profile.split('/').at(-2)}

                    </div>
                )}


            </div>

            <button
                onClick={() => complete(profileList, setLinkedinProfiles)}
            >
                Search profiles
            </button>

        </div>



    )

}
