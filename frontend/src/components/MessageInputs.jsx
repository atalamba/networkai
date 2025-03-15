import { useEffect, useState } from 'react'
import complete from '../api/get-message'


function MessageInputs({ profile, template, setTemplate, instructions, setInstructions,
    message,
    setMessage
}) {

    const getMessageProps = {
        profile, template, instructions, message, setMessage
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
            
            <textarea
                placeholder="Please provide any additional instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows="2"
                style={{ width: "100%", minHeight: "30px" }}
            />

            <button
                onClick={() => complete({ ...getMessageProps })}
                disabled={!profile || !template }
            >
                Get the personalized email
            </button>
        </div>


    )

}

export default MessageInputs