import { useEffect, useState } from 'react'

export default function InputProfile({ profileList, setProfileList }) {

    // profile link goes here

    const [currentPerson, setCurrentPerson] = useState({
        name: "",
        email: "",
        company: ""
    })

    const addProfile = () => {
        const person = {
            name: currentPerson.name,
            email: currentPerson.email,
            company: currentPerson.company
        }

        const newProfileList = [...profileList, person]

        setProfileList(newProfileList)

        setCurrentPerson(
            {
                name: "",
                email: "",
                company: person.company
            }
        )
    }

    return (
        <div style={{display:"flex", flexDirection: "column"}}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "100%" }}>
                    <h2>Name</h2>


                    <input
                        style={{
                            fontSize: "1.2rem", padding: "12px", marginBottom: "10px", marginRight: "10px", width: "30%",
                            minWidth: "250px"
                        }}
                        placeholder="Name"
                        value={currentPerson.name}
                        onChange={(e) => setCurrentPerson(prevState => ({ ...prevState, name: e.target.value }))}
                    />


                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "100%" }}>
                    <h2>Company</h2>


                    <input
                        style={{
                            fontSize: "1.2rem", padding: "12px", marginBottom: "10px", marginRight: "10px", width: "30%",
                            minWidth: "250px"
                        }}
                        placeholder="Company"
                        value={currentPerson.company}
                        onChange={(e) => setCurrentPerson(prevState => ({ ...prevState, company: e.target.value }))}
                    />


                </div>

                




                <button
                    onClick={() => addProfile()}
                >Send</button>

                <button
                onClick={()=> setProfileList([])}
                >
                    Clear
                </button>


               



            </div>

            <div>
                    {profileList.map((profile, index) =>
                        <div
                        key = {index}
                        >
                            {profile.name}

                        </div>
                    )}


                </div>

        </div>



    )

}



/**
 * 
 * 
 * <div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "100%" }}>
                    <h2>Email</h2>


                    <input
                        style={{
                            fontSize: "1.2rem", padding: "12px", marginBottom: "10px", marginRight: "10px", width: "30%",
                            minWidth: "250px"
                        }}
                        placeholder="Name"
                        value={currentPerson.email}
                        onChange={(e) => setCurrentPerson(prevState => ({ ...prevState, email: e.target.value }))}
                    />


                </div>

 */