import { useState } from 'react'

function extractProfileInfo(data) {
    const profileInfo = {

        instructions: "",
        message: "",

        id: data.id,

        name: data.firstName + " " + data.lastName,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        student: data.student || false,

        education: data.education ? data.education.map(edu => ({
            schoolName: edu.schoolName || null,
            degree: edu.degreeName || null,
            fieldOfStudy: edu.fieldOfStudy || null,
            activities: edu.activities || null,
            startYear: edu.timePeriod?.startDate?.year || null,
            endYear: edu.timePeriod?.endDate?.year || null,
        })) : [],

        experience: data.experience ? data.experience.map(exp => ({
            companyName: exp.companyName || null,
            title: exp.title || null,
            description: exp.description || null,
            startDate: exp.timePeriod?.startDate?.year ?
                `${exp.timePeriod?.startDate?.month || ''}/${exp.timePeriod?.startDate?.year}` : null,
            endDate: exp.timePeriod?.endDate?.year ?
                `${exp.timePeriod?.endDate?.month || ''}/${exp.timePeriod?.endDate?.year}` : "Present",
        })) : []
    };

    return profileInfo;
}

function mapProfilesToObject(rawProfiles) {
    return rawProfiles.reduce((acc, rawProfile) => {
        const profile = extractProfileInfo(rawProfile);
        if (profile.id) {
            acc[profile.id] = profile;
        }
        return acc;
    }, {});
}

function complete(profileList, setLinkedinProfiles, LinkedinProfiles) {

    const Endpoint = "http://127.0.0.1:5000"
    const profileEndpoint = `${Endpoint}/search-profile?`;

    const idList = profileList.map(profile => profile.split("/").at(-2))
    const idListQuery = idList.filter(id => !LinkedinProfiles[id])

    // CACHING LOGIC HERE, ONLY HAVE THE IDLIST HAVE WHAT IT NEEDS TO HAVE
    // THEN MAKE SURE THAT THE RESULTING NEW PROFIELS ARE ADDED PROPERLY IN THE EXISTING PROFILES

    fetch(`${profileEndpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idList: idListQuery
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    }).then(data => {
        const rawProfiles = data.profileList


        if (rawProfiles?.length > 0) {

            const cleanedProfiles = mapProfilesToObject(rawProfiles)

            setLinkedinProfiles(prevProfiles => ({
                ...prevProfiles,
                ...cleanedProfiles
            }))
            console.log(LinkedinProfiles)
        }
    })


}

export default complete