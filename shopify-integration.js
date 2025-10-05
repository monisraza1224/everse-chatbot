// Everse Chat Widget - Shopify Integration
class ShopifyChatIntegration {
    constructor() {
        this.isInitialized = false;
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
        if (document.getElementById('chat-widget')) return;

        const CHAT_SERVER_URL = 'https://everse-chatbot.onrender.com';

        // Inject CSS asynchronously
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = `${CHAT_SERVER_URL}/chat-widget.css`;
        cssLink.onload = () => console.log('✅ Everse Chat Widget CSS loaded');
        document.head.appendChild(cssLink);

        // Chat HTML Structure
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
                            I'm here to help you with:
                            <br><br>
                            • Product recommendations & pricing<br>
                            • Technical specifications<br>
                            • Installation guidance<br>
                            • Shipping & warranty information<br>
                            <br>
                            <div class="support-notice">
                                <strong>Need human assistance?</strong><br>
                                Contact our sales team at <a href="mailto:Sales@eversetraveltech.com" class="contact-email">Sales@eversetraveltech.com</a> for personalized support.
                            </div>
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
            <button id="chat-toggle">
                <div class="toggle-content">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="6" width="18" height="2" fill="#6B7280"/>
                        <rect x="3" y="11" width="18" height="2" fill="#0D1B2A"/>
                        <rect x="3" y="16" width="18" height="2" fill="#1B5E20"/>
                    </svg>
                    <span class="pulse-dot"></span>
                </div>
            </button>
        `;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = chatHTML;
        document.body.appendChild(wrapper);

        // Inject JavaScript asynchronously
        const script = document.createElement('script');
        script.src = `${CHAT_SERVER_URL}/chat-widget.js`;
        script.async = true;
        script.onload = () => console.log('✅ Everse Chat Widget JS loaded');
        document.head.appendChild(script);

        this.isInitialized = true;
        console.log('✅ Everse Chat Widget injected successfully');
    }
}

// Initialize
new ShopifyChatIntegration();

