document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded event fired');
  document.getElementById('send-button').addEventListener('click', sendMessage);
  document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
});

function sendMessage() {
  console.log('sendMessage called');
  const userInput = document.getElementById('user-input');
  const message = userInput.value.trim();

  if (message) {
    displayMessage('user', message);
    userInput.value = '';

    // Call the backend API to generate a response
    generateResponse(message);
  }
}

function displayMessage(sender, message) {
  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');
  messageElement.className = `message ${sender}`;
  messageElement.innerText = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function generateResponse(message) {
  console.log('generateResponse called with message:', message);
  try {
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const targetUrl = 'http://127.0.0.1:5000/api/chat';
    const response = await fetch(proxyUrl + encodeURIComponent(targetUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message })
    });

    if (response.ok) {
      const data = await response.json();
      displayMessage('ai', data.response);
    } else {
      console.error('Error generating AI response:', response.statusText);
    }
  } catch (error) {
    console.error('Error generating AI response:', error);
  }
}
