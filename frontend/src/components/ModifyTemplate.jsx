export default function ModifyTemplate({template, setTemplate}) {
    return (
        <textarea
                placeholder="Please provide an email template"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                rows="6" // Adjust this number as needed
                style={{ width: "100%", minHeight: "100px" }} // Ensures more height
            />
    )
}