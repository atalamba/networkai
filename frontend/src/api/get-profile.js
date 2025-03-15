function extractProfileInfo(data) {
    const profileInfo = {
    
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

function complete(inputProfile, setProfile) {

    const Endpoint = "http://127.0.0.1:5000"
    const profileEndpoint = `${Endpoint}/get-profile?`;

    const profileId = inputProfile?.split("/").at(-2)

    const queryParams = new URLSearchParams({ profile: profileId }).toString();

    fetch(`${profileEndpoint + queryParams}`)
        .then((res) => res.json())
        .then((data) => {
            const recievedData = data.profile
            const profileInfo = extractProfileInfo(recievedData)
            setProfile(profileInfo)
            console.log(`{Data recieved: ${JSON.stringify(recievedData)}`)
        })
        .catch((err) => {
            console.error("Error fetching profile:", err);
        });


}

export default complete