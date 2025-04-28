import { useEffect, useState } from 'react'
import complete from "../../api/OLD-ENDPOINTS/get-profile"

function GetProfile({ setProfile }) {

    // profile link goes here
    const [inputProfile, setInputProfile] = useState("")


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width:"100%" }}>
            <h2>Input a profile</h2>

            <div style={{ width:"100%"}}>
            <input
                style={{ fontSize: "1.2rem", padding: "12px", marginBottom: "10px" , marginRight:"10px", width:"30%",
                    minWidth: "250px"
                 }}
                placeholder="Profile Link"
                value={inputProfile}
                onChange={(e) => setInputProfile(e.target.value)}
            />


            <button
                onClick={() => complete(inputProfile, setProfile)}
            >Send</button>

            </div>
            

            
        </div>

    )

}


export default GetProfile