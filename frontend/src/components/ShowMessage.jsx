
function ShowMessage({ message, setMessage }) {

    return (
            
            <textarea
                style={{width: "100%" , minHeight: "200px"}}
                placeholder='Message goes here'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

    )

}

export default ShowMessage