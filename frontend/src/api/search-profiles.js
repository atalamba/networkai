import { useState } from 'react'

function extractProfileInfo(data) {
    const profileInfo = {

        instructions: "",
        message: "",

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
        if (profile.name) {
            acc[profile.name] = profile;
        }
        return acc;
    }, {});
}

function complete(profileList, setLinkedinProfiles) {

    const Endpoint = "http://127.0.0.1:5000"
    const profileEndpoint = `${Endpoint}/search-profile?`;

    const idList = profileList.map(profile => profile.split("/").at(-2))

    setLinkedinProfiles({})

    fetch(`${profileEndpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idList,
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

            setLinkedinProfiles(cleanedProfiles)
            console.log(cleanedProfiles)
        }
    })


}

export default complete