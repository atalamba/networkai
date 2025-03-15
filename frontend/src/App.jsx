
import './App.css'
import { useEffect, useState } from 'react'
import GetProfile from './components/GetProfile'
import MessageInputs from './components/MessageInputs'
import ShowMessage from './components/ShowMessage'
import ShowProfile from './components/ShowProfile'
import InputProfile from './components/InputProfile'
import SeeProfiles from './components/SeeProfiles'
import ProfileToggle from './components/ProfileToggle'
import ProfileAndMessage from './components/ProfileAndMessage'

import CompanySearch from './components/CompanySearch'

function App() {

  // the data that comes from linkedin
  const [profileList, setProfileList] = useState([]) // for the people as input, INPUT

  const [LinkedinProfiles, setLinkedinProfiles] = useState({}) // WHOLE PROFILES

  const [currentProfile, setCurrentProfile] = useState("") // THE CURRENTLY SELECTED PROFILE, JUST THE NAME, USED AS KEY



  return (
    <div>


      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width:"100%" }}>

      

      <InputProfile profileList={profileList} 
      setProfileList={setProfileList}
      setLinkedinProfiles={setLinkedinProfiles}
      /> 

      <ProfileAndMessage LinkedinProfiles={LinkedinProfiles} 
      setLinkedinProfiles = {setLinkedinProfiles}
        currentProfile={currentProfile} 
        setCurrentProfile={setCurrentProfile} 
      />

      
      

    </div>


    </div>
    
  )
}

export default App

/** ULTIMATE GOAL: ONE BUTTON, AND THEY ALL COME.
 * ALLOW YOU TO HAVE EXTREME VOLUME
 * PRETTY FEATURES DON'T MATTER. PURE DAMN VOLUME
 * 
 * Prerequisites: FUCKING API KEY INCLUDED FROM .ENV, NOT FROM THE COMMAND PROMPT
 * adjust app.py to search for the person's company as well, for faster results
 * 
 * Add a "write all" button
 *    Adjust app.py prompt if necessary, to get the best results DONE
 * 
 * Adjust app.py to search for COMPANIES in your network
 *    Allow you to check boxes on and off, for who you want to talk to (not to partners for example)
 * 
 * ONCE THIS STEP IS DONE ... ABSURD VOLUME IS POSSIBLE
 * THOUSANDS OF MESSAGES
 * 
 */