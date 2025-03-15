

function complete( profile, template, setMessage, currentProfile ) {
  fetch("http://127.0.0.1:5000/get-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      profile,
      template,
      instructions: profile.instructions,
      message: profile.message
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      setMessage(data.message, currentProfile);
    })
    .catch(error => {
      console.error("Error fetching AI message:", error);
    });
}

export default complete