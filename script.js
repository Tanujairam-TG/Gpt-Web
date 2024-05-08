// Function to append a message to the chat window
function appendMessage(sender, message) {
    const chatWindow = document.getElementById("chat-window");
    const messageElement = document.createElement("div");
    messageElement.textContent = `${sender}: ${message}`;
    chatWindow.appendChild(messageElement);
    return messageElement; // Return the message element for further manipulation if needed
}

// Function to send a message using the API
function sendMessage(message) {
    // Display a waiting message while waiting for the API response
    appendMessage("You", message);
    var waitingMessage = appendMessage("AI", "Writing response...");
    waitingMessage.id = 'waiting-message';
    
    // API call to style the text
    fetch(`https://nandha-api.onrender.com/styletext?query=${encodeURIComponent(message)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Remove the waiting message by ID
        var waitingElement = document.getElementById('waiting-message');
        if (waitingElement) {
            waitingElement.remove();
        }
        appendMessage("AI", data.styledText); // Assuming the API returns an object with a styledText property
        // Clear the user input
        document.getElementById("user-input").value = '';
    })
    .catch(error => {
        console.error("Error:", error);
        appendMessage("AI", "An error occurred. Please try again.");
    });
}

// Event listener for the send button
document.getElementById("send-btn").addEventListener("click", function() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() !== '') { // Check if the input is not empty
        sendMessage(userInput);
    }
});

// Initialize the chat by appending a welcome message
window.onload = function() {
    appendMessage("AI", "Welcome to the chat!");
};
