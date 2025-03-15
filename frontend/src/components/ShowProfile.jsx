function ShowProfile({ LinkedinProfiles, currentProfile }) {

    const profile = LinkedinProfiles[currentProfile]

    if (Object.keys(profile).length === 0) {
        return <p>No profile data available.</p>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
            {profile && (
                <>
                    <h2>{profile.firstName}{" "}{profile.lastName} </h2>
                    <h2>Education:</h2>
                    {profile?.education.map((edu, index) => (
                        <div key={index} style={{ paddingLeft: "1rem" }}>
                            <strong>{edu.schoolName}</strong>
                            {edu.degree ? `( ${edu.degree} in ${edu.fieldOfStudy} )` : ""}
                            {edu.endYear ? ` : Graduates in ${edu.endYear}` : ""}
                        </div>
                    ))}


                    <h2>Experience:</h2>
                    {profile?.experience.map((exp, index) => (
                        <div key={index} style={{ paddingLeft: "1rem", textAlign: "left", width: "100%" }}>
                            <strong>{exp.companyName}</strong> - {exp.title} ({exp.startDate} -{" "}
                            {exp.endDate})
                            {exp.description && (
                                <p style={{ whiteSpace: "pre-wrap", marginTop: "0.5rem", textAlign: "left", width: "100%" }}>
                                    {exp.description}
                                </p>
                            )}
                        </div>
                    ))}
                </>
            )}

        </div>

    )
}

export default ShowProfile