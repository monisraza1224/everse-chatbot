// Professional Shopify Chat Integration
class ShopifyChatIntegration {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Wait for Shopify page to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectChatWidget());
        } else {
            this.injectChatWidget();
        }
    }

    injectChatWidget() {
        // Don't inject if already exists
        if (document.getElementById('chat-widget')) {
            return;
        }

        // Use ngrok URL for all resources
     const CHAT_SERVER_URL = '';
        // Inject CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '/chat-widget.css';
        document.head.appendChild(cssLink);

        // Inject HTML structure
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
                    </svg>
                    <span class="pulse-dot"></span>
                </div>
            </button>
        `;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = chatHTML;
        document.body.appendChild(wrapper);

        // Inject JavaScript
        const script = document.createElement('script');
        script.src = '/chat-widget.js';
        document.head.appendChild(script);

        this.isInitialized = true;
        console.log('✅ Everse Professional Chat Widget injected into Shopify store');
    }
}

// Initialize when loaded
new ShopifyChatIntegration();