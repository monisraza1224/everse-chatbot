// Basic chat functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const messagesContainer = document.getElementById('messagesContainer');
    
    // Toggle chat window
    chatButton.addEventListener('click', function() {
        chatWindow.classList.toggle('show');
    });
    
    // Close chat window
    closeChat.addEventListener('click', function() {
        chatWindow.classList.remove('show');
    });
    
    // Send message function
    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText) {
            // Add user message
            addMessage(messageText, 'user');
            
            // Clear input
            chatInput.value = '';
            
            // Here you would connect to your backend
            // For now, just show a placeholder response
            setTimeout(() => {
                addMessage("Thanks for your message! I'm here to help with Everse products. How can I assist you today?", 'bot');
            }, 1000);
        }
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Send message on button click
    sendButton.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
