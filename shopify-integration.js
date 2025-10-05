// Everse Shopify Chat Integration - With AI Service Connection
(function() {
    'use strict';
    
    // Wait for page to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChat);
    } else {
        initChat();
    }

    function initChat() {
        // Check if already injected
        if (document.getElementById('everse-chat-container')) {
            return;
        }

        // Create the main chat container
        const chatContainer = document.createElement('div');
        chatContainer.id = 'everse-chat-container';
        chatContainer.style.cssText = `
            position: fixed;
            bottom: 95px;
            right: 25px;
            width: 380px;
            height: 600px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
            z-index: 10000;
            display: none;
            border: 1px solid #e5e7eb;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        // Create chat HTML directly (no iframe)
        chatContainer.innerHTML = `
            <div id="chat-widget">
                <div id="chat-header">
                    <div class="header-content">
                        <div class="avatar">E</div>
                        <div class="header-text">
                            <h3>Everse Support</h3>
                            <span class="status">Online • Typically replies instantly</span>
                        </div>
                    </div>
                    <button id="close-chat">×</button>
                </div>
                <div id="chat-messages">
                    <div class="message bot-message">
                        <div class="message-avatar">E</div>
                        <div class="message-content">
                            <strong>Welcome to Everse Support</strong><br><br>
                            I'm here to help you with:
                            <br><br>
                            • Product recommendations & pricing<br>
                            • Technical specifications<br>
                            • Installation guidance<br>
                            • Shipping & warranty information<br>
                            <br>
                            How can I assist you today?
                        </div>
                    </div>
                </div>
                <div id="chat-input-container">
                    <input type="text" id="chat-input" placeholder="Ask about products, pricing, or support..." maxlength="500">
                    <button id="send-button">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        // Create chat toggle button
        const toggleButton = document.createElement('button');
        toggleButton.id = 'everse-chat-toggle';
        toggleButton.innerHTML = `
            <div style="position: relative; display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <rect x="4" y="7" width="16" height="2"></rect>
                    <rect x="4" y="11" width="16" height="2"></rect>
                    <rect x="4" y="15" width="16" height="2"></rect>
                </svg>
                <span style="
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    width: 12px;
                    height: 12px;
                    background: #00C853;
                    border-radius: 50%;
                    border: 2px solid white;
                    animation: pulse 2s infinite;
                "></span>
            </div>
        `;
        toggleButton.style.cssText = `
            position: fixed;
            bottom: 25px;
            right: 25px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #0D1B2A 0%, #1B5E20 100%);
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(76, 175, 80, 0.4);
            z-index: 10001;
            transition: all 0.3s ease;
        `;

        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            #everse-chat-toggle:hover {
                transform: scale(1.1);
                background: linear-gradient(135deg, #13294B 0%, #2E7D32 100%);
            }
            #everse-chat-container.active {
                display: block !important;
            }
            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            /* Chat widget styles */
            #chat-header {
                background: #0D1B2A;
                color: white;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .header-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .avatar {
                width: 40px;
                height: 40px;
                background: #4CAF50;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 16px;
                color: white;
            }
            .header-text h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
            }
            .status {
                font-size: 12px;
                color: #d1d5db;
            }
            #close-chat {
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 4px;
                width: 28px;
                height: 28px;
                border-radius: 50%;
            }
            #chat-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background: #f8fafc;
                height: 400px;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .message {
                display: flex;
                gap: 12px;
            }
            .message-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 600;
                flex-shrink: 0;
            }
            .bot-message .message-avatar {
                background: #0D1B2A;
                color: white;
            }
            .user-message .message-avatar {
                background: #4CAF50;
                color: white;
            }
            .message-content {
                padding: 14px 18px;
                border-radius: 18px;
                line-height: 1.5;
                font-size: 14px;
                max-width: 280px;
                word-wrap: break-word;
            }
            .bot-message .message-content {
                background: #F9FAFB;
                color: #333333;
                border: 1px solid #e5e7eb;
            }
            .user-message .message-content {
                background: #4CAF50;
                color: white;
            }
            .user-message {
                flex-direction: row-reverse;
            }
            #chat-input-container {
                padding: 20px;
                border-top: 1px solid #e5e7eb;
                display: flex;
                gap: 12px;
                background: white;
            }
            #chat-input {
                flex: 1;
                padding: 14px 18px;
                border: 1px solid #d1d5db;
                border-radius: 14px;
                font-size: 14px;
            }
            #send-button {
                background: #4CAF50;
                color: white;
                border: none;
                padding: 14px 18px;
                border-radius: 14px;
                cursor: pointer;
            }
            .typing-indicator {
                display: flex;
                gap: 12px;
                align-items: center;
                padding: 14px 18px;
                background: #F9FAFB;
                border: 1px solid #e5e7eb;
                border-radius: 18px;
                max-width: 120px;
            }
            .typing-dots {
                display: flex;
                gap: 4px;
            }
            .typing-dots span {
                animation: typing 1.4s infinite;
                display: inline-block;
                width: 8px;
                height: 8px;
                background: #6b7280;
                border-radius: 50%;
            }
            .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
            .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
            @keyframes typing {
                0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                30% { transform: translateY(-4px); opacity: 1; }
            }
            
            @media (max-width: 480px) {
                #everse-chat-container {
                    width: 90vw !important;
                    height: 70vh !important;
                    right: 5vw !important;
                    bottom: 80px !important;
                }
            }
        `;

        // Add to page
        document.head.appendChild(styles);
        document.body.appendChild(chatContainer);
        document.body.appendChild(toggleButton);

        // Add chat functionality
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-button');
        const closeButton = document.getElementById('close-chat');
        const chatMessages = document.getElementById('chat-messages');
        let conversationHistory = [];

        // Toggle chat
        toggleButton.addEventListener('click', function() {
            chatContainer.classList.toggle('active');
            if (chatContainer.classList.contains('active')) {
                chatInput.focus();
            }
        });

        // Close chat
        closeButton.addEventListener('click', function() {
            chatContainer.classList.remove('active');
        });

        // Send message to AI service
        async function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;

            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';

            // Show typing indicator
            showTypingIndicator();

            try {
                // Call your AI service
                const response = await fetch('https://everse-chatbot.onrender.com/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: message,
                        conversationHistory: conversationHistory
                    })
                });

                const data = await response.json();
                
                // Remove typing indicator
                removeTypingIndicator();

                if (data.response) {
                    addMessage(data.response, 'bot', true); // true means it's HTML
                    // Update conversation history
                    conversationHistory.push(
                        { role: 'user', content: message },
                        { role: 'assistant', content: data.response }
                    );
                } else {
                    addMessage('Sorry, I encountered an error. Please try again.', 'bot');
                }

            } catch (error) {
                console.error('Error sending message:', error);
                removeTypingIndicator();
                addMessage('Sorry, I\'m having trouble connecting. Please try again.', 'bot');
            }
        }

        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });

        function addMessage(text, sender, isHTML = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'message-avatar';
            avatarDiv.textContent = sender === 'user' ? 'Y' : 'E';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            
            if (isHTML) {
                contentDiv.innerHTML = text;
            } else {
                contentDiv.textContent = text;
            }
            
            if (sender === 'user') {
                messageDiv.appendChild(contentDiv);
                messageDiv.appendChild(avatarDiv);
            } else {
                messageDiv.appendChild(avatarDiv);
                messageDiv.appendChild(contentDiv);
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing-indicator';
            typingDiv.id = 'typing-indicator';
            
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'message-avatar';
            avatarDiv.textContent = 'E';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.innerHTML = `
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            `;
            
            typingDiv.appendChild(avatarDiv);
            typingDiv.appendChild(contentDiv);
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function removeTypingIndicator() {
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        console.log('✅ Everse Chat Widget loaded with AI service connection');
    }
})();
