// Everse Shopify Chat Integration - Complete Version
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
        if (this.isInitialized) return;

        // Inject CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://everse-chatbot.onrender.com/chat-widget.css';
        document.head.appendChild(cssLink);

        // Inject the COMPLETE chat HTML (button + window)
        const chatHTML = `
            <!-- CHAT WINDOW -->
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

            <!-- CHAT BUTTON -->
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

        // Inject the JavaScript functionality
        const script = document.createElement('script');
        script.src = 'https://everse-chatbot.onrender.com/chat-widget.js';
        document.head.appendChild(script);

        this.isInitialized = true;
        console.log('✅ Everse Chat Widget fully injected');
    }
}

// Initialize
new ShopifyChatIntegration();
