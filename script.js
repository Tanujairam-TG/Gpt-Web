function sendMessage(message) {
    // Display a waiting message while waiting for the API response
    appendMessage("You", message);
    appendMessage("AI", "Waiting for response...");
    
    fetch(`https://nandha-api.onrender.com/ai/gpt/${encodeURIComponent(message)}`)
    .then(response => response.json())
    .then(data => {
        // Remove the waiting message
        document.getElementById("chat-window").lastChild.remove();
        appendMessage("AI", data.content);
    })
    .catch(error => console.error("Error:", error));
}

function appendMessage(sender, message) {
    var chatWindow = document.getElementById("chat-window");
    var messageElement = document.createElement("div");
    messageElement.textContent = `${sender}: ${message}`;
    chatWindow.appendChild(messageElement);
}

document.getElementById("send-btn").addEventListener("click", function() {
    var userInput = document.getElementById("user-input").value;
    sendMessage(userInput);
});
