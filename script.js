

function sendMessage(message) {
    fetch(`https://nandha-api.onrender.com/ai/gpt/${encodeURIComponent(message)}`)
    .then(response => response.json())
    .then(data => {
        appendMessage("You", message);
        appendMessage("AI", data.content);
    })
    .catch(error => console.error("Error:", error));
}

function appendMessage(sender, message) {
    var chatWindow = document.getElementById("chat-window");
    var messageElement = document.createElement("div");
    messageElement.textContent = `${sender}: ${message}`;
    chatWindow.appendChild(messageElement);

    

document.getElementById("send-btn").addEventListener("click", function() {
    var userInput = document.getElementById("user-input").value;
    sendMessage(userInput);
});


