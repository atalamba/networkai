import ProfileToggle from "./ProfileToggle"
import ModifyTemplate from "./ModifyTemplate"
import ManageMessage from "./ManageMessage"

import { useState } from 'react'

import complete from '../api/get-message'


export default function ProfileAndMessage({
    LinkedinProfiles,
    setLinkedinProfiles,
    currentProfile,
    setCurrentProfile,
}) {

    const [template, setTemplate] = useState("")

    // TO PROPERLY TAKE DATA FROM BACKEND AND PUT IN REACT STATE
    const hookSetmessage = (message, currentProfile) => {
        setLinkedinProfiles(prevProfiles => ({
            ...prevProfiles, // Keep all other profiles unchanged
            [currentProfile]: {
                ...prevProfiles[currentProfile], // Copy the existing profile
                message // Update only the message field
            }
        }));
    }

    // TO FETCH THE DATA
    const handleGetMessage = () => {
        complete(LinkedinProfiles[currentProfile],
            template,
            hookSetmessage,
            currentProfile
        )
    }


    // TO MODIFY INSTRUCTIONS AND MESSAGE MANUALLY MANUALLY MANUALLY
    const setOneProfile = (property, value) => {
        setLinkedinProfiles(prevProfiles => ({
            ...prevProfiles, // Keep all other profiles unchanged
            [currentProfile]: {
                ...prevProfiles[currentProfile], // Copy the existing profile
                [property]: value // Dynamically update the specified property
            }
        }));
    };

    const writeAll = (LinkedinProfiles, template, setMessage) => {
        // for each profile, get the message
        for (const profile in LinkedinProfiles) {
            complete(LinkedinProfiles[profile], template, setMessage, profile)
        }
    }



    return (
        <>

            {Object.keys(LinkedinProfiles)?.length > 0 && (
                <div>
                    <ProfileToggle LinkedinProfiles={LinkedinProfiles}
                        currentProfile={currentProfile}
                        setCurrentProfile={setCurrentProfile} />

                    {currentProfile.length > 0 && (
                         <ManageMessage LinkedinProfiles={LinkedinProfiles}
                         currentProfile={currentProfile}
                         handleGetMessage={handleGetMessage}
                         setOneProfile={setOneProfile} />
                    )}

                    <button
                        onClick={() => writeAll(LinkedinProfiles, template, hookSetmessage)}
                    >
                        Write all
                    </button>
                   

                </div>


            )}

            <ModifyTemplate template={template} setTemplate={setTemplate} />

        </>
    )
}

/**
 * 
 * // ONLY DO THIS IF YOU SELECTED A PROFILE WITH THE BUTTON, because you will access properties
 * 
 />
 * 
 */


