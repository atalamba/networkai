import { useState } from "react";
import ShowProfile from './ShowProfile'

export default function ProfileToggle({ LinkedinProfiles, currentProfile, setCurrentProfile }) {
    return (
        <div>
            <ul>
                {Object.keys(LinkedinProfiles).map((profileKey) => (
                    <div key={profileKey}>
                        <button onClick={() => setCurrentProfile(profileKey)}>
                            {LinkedinProfiles[profileKey].name}
                        </button>
                    </div>
                ))}
            </ul>
            

           {(Object.keys(LinkedinProfiles)?.length > 0 && currentProfile.length > 0) && (
            <ShowProfile LinkedinProfiles = {LinkedinProfiles} currentProfile={currentProfile} /> )}


        </div>

    )

}