class ChatWidget {
    constructor() {
        this.isOpen = true; // Chat opens automatically when loaded
        this.conversationHistory = [];
        this.initializeWidget();
        this.addEventListeners();
    }

    initializeWidget() {
        console.log('Everse Chat Widget initialized');
        // Chat window opens automatically
        document.getElementById('chat-widget').classList.add('active');
        document.getElementById('chat-input').focus();
    }

    addEventListeners() {
        // Chat button toggle
        document.getElementById('chatButton').addEventListener('click', () => {
            this.toggleChat();
        });

        // Close chat
        document.getElementById('close-chat').addEventListener('click', () => {
            this.closeChat();
        });

        // Send message
        document.getElementById('send-button').addEventListener('click', () => {
            this.sendMessage();
        });

        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleChat() {
        const chatWidget = document.getElementById('chat-widget');
        chatWidget.classList.toggle('active');
        this.isOpen = chatWidget.classList.contains('active');
        
        if (this.isOpen) {
            document.getElementById('chat-input').focus();
        }
    }

    closeChat() {
        document.getElementById('chat-widget').classList.remove('active');
        this.isOpen = false;
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();

        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';

        try {
            const response = await fetch('https://everse-chatbot.onrender.com/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    conversationHistory: this.conversationHistory
                })
            });

            const data = await response.json();

            if (data.response) {
                this.addMessage(data.response, 'bot', true);
                this.conversationHistory.push(
                    { role: 'user', content: message },
                    { role: 'assistant', content: data.response }
                );
                
                if (this.conversationHistory.length > 10) {
                    this.conversationHistory = this.conversationHistory.slice(-10);
                }
            } else {
                this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
            }

        } catch (error) {
            console.error('Error sending message:', error);
            this.addMessage('Sorry, I\'m having trouble connecting. Please try again.', 'bot');
        }
    }

    addMessage(text, sender, isHTML = false) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (isHTML) {
            contentDiv.innerHTML = text;
        } else {
            contentDiv.textContent = text;
        }
        
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chat widget when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChatWidget();
});
