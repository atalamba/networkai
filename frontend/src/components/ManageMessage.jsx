

export default function ManageMessage({  
    LinkedinProfiles,
    currentProfile,
    handleGetMessage,
    setOneProfile,
}) {

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>

                <textarea
                    placeholder="Please provide any additional instructions"
                    value={LinkedinProfiles[currentProfile]?.instructions}
                    onChange={(e) =>
                        setOneProfile("instructions", e.target.value)
                      }                      
                    rows="2"
                    style={{ width: "100%", minHeight: "30px" }}
                />

                <button
                    onClick={() => handleGetMessage()}
                >
                    Get the personalized email
                </button>
            </div>


            <textarea
                style={{ width: "100%", minHeight: "200px" }}
                placeholder='Message goes here'
                value={LinkedinProfiles[currentProfile]?.message}
                onChange={(e) => 
                    setOneProfile("message", e.target.value)
                }
            />
        </div>


    )

}

