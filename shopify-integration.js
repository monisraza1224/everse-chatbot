// Everse Shopify Chat Integration - Complete All-in-One
(function() {
    'use strict';
    
    class ShopifyChatIntegration {
        constructor() {
            this.isInitialized = false;
            this.conversationHistory = [];
            this.init();
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.injectChatWidget());
            } else {
                this.injectChatWidget();
            }
        }

        injectChatWidget() {
            if (this.isInitialized) return;

            // Inject ALL CSS directly
            const styles = document.createElement('style');
            styles.textContent = `
                /* Chat Widget Styles */
                #chat-toggle {
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
                    z-index: 10000;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                #chat-toggle:hover {
                    transform: scale(1.1);
                }
                .toggle-content {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .pulse-dot {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    width: 12px;
                    height: 12px;
                    background: #00C853;
                    border-radius: 50%;
                    border: 2px solid white;
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 1; }
                }
                #chat-widget {
                    position: fixed;
                    bottom: 95px;
                    right: 25px;
                    width: 380px;
                    height: 600px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                    display: none;
                    flex-direction: column;
                    z-index: 10000;
                    border: 1px solid #e5e7eb;
                    overflow: hidden;
                }
                #chat-widget.active {
                    display: flex;
                }
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
                }
                .user-message .message-avatar {
                    background: #4CAF50;
                    color: white;
                }
                .bot-message .message-avatar {
                    background: #0D1B2A;
                    color: white;
                }
                .message-content {
                    padding: 14px 18px;
                    border-radius: 18px;
                    line-height: 1.5;
                    font-size: 14px;
                    max-width: 280px;
                }
                .user-message .message-content {
                    background: #4CAF50;
                    color: white;
                }
                .bot-message .message-content {
                    background: #F9FAFB;
                    color: #333333;
                    border: 1px solid #e5e7eb;
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
            `;
            document.head.appendChild(styles);

            // Inject HTML
            const chatHTML = `
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
                                I'm here to help you with product information and support.
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
                <button id="chat-toggle">
                    <div class="toggle-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect x="4" y="7" width="16" height="2" fill="white"/>
                            <rect x="4" y="11" width="16" height="2" fill="white"/>
                            <rect x="4" y="15" width="16" height="2" fill="white"/>
                        </svg>
                        <span class="pulse-dot"></span>
                    </div>
                </button>
            `;

            const wrapper = document.createElement('div');
            wrapper.innerHTML = chatHTML;
            document.body.appendChild(wrapper);

            // Add functionality
            this.addChatFunctionality();
            this.isInitialized = true;
        }

        addChatFunctionality() {
            const toggleBtn = document.getElementById('chat-toggle');
            const chatWidget = document.getElementById('chat-widget');
            const closeBtn = document.getElementById('close-chat');
            const sendBtn = document.getElementById('send-button');
            const chatInput = document.getElementById('chat-input');
            const chatMessages = document.getElementById('chat-messages');

            // Toggle chat
            toggleBtn.addEventListener('click', () => {
                chatWidget.classList.toggle('active');
            });

            // Close chat
            closeBtn.addEventListener('click', () => {
                chatWidget.classList.remove('active');
            });

            // Send message
            const sendMessage = async () => {
                const message = chatInput.value.trim();
                if (!message) return;

                this.addMessage(message, 'user');
                chatInput.value = '';

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
                    } else {
                        this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
                    }

                } catch (error) {
                    console.error('Error:', error);
                    this.addMessage('Sorry, I\'m having trouble connecting. Please try again.', 'bot');
                }
            };

            sendBtn.addEventListener('click', sendMessage);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
        }

        addMessage(text, sender, isHTML = false) {
            const chatMessages = document.getElementById('chat-messages');
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
    }

    // Initialize
    new ShopifyChatIntegration();
})();
