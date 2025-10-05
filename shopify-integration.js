// Everse Shopify Chat Integration - Simplified
class ShopifyChatIntegration {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectChatIframe());
        } else {
            this.injectChatIframe();
        }
    }

    injectChatIframe() {
        if (document.getElementById('everse-chat-iframe')) return;

        // Create chat toggle button
        const toggleButton = document.createElement('button');
        toggleButton.id = 'everse-chat-toggle';
        toggleButton.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <rect x="4" y="7" width="16" height="2"></rect>
                    <rect x="4" y="11" width="16" height="2"></rect>
                    <rect x="4" y="15" width="16" height="2"></rect>
                </svg>
                <span style="position: absolute; top: -2px; right: -2px; width: 12px; height: 12px; background: #00C853; border-radius: 50%; border: 2px solid white; animation: pulse 2s infinite;"></span>
            </div>
        `;
        
        // Add styles
        const styles = `
            <style>
                #everse-chat-toggle {
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
                }
                #everse-chat-toggle:hover {
                    transform: scale(1.1);
                    background: linear-gradient(135deg, #13294B 0%, #2E7D32 100%);
                }
                #everse-chat-iframe {
                    position: fixed;
                    bottom: 95px;
                    right: 25px;
                    width: 380px;
                    height: 600px;
                    border: none;
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                    z-index: 10000;
                    display: none;
                }
                #everse-chat-iframe.active {
                    display: block;
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @media (max-width: 480px) {
                    #everse-chat-iframe {
                        width: 90vw;
                        height: 70vh;
                        right: 5vw;
                        bottom: 80px;
                    }
                }
            </style>
        `;

        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.id = 'everse-chat-iframe';
        iframe.src = 'https://everse-chatbot.onrender.com/chat-widget';
        iframe.allow = 'microphone';

        // Add to page
        document.head.insertAdjacentHTML('beforeend', styles);
        document.body.appendChild(toggleButton);
        document.body.appendChild(iframe);

        // Add toggle functionality
        toggleButton.addEventListener('click', () => {
            iframe.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!iframe.contains(e.target) && !toggleButton.contains(e.target) && iframe.classList.contains('active')) {
                iframe.classList.remove('active');
            }
        });

        console.log('✅ Everse Chat Widget injected');
    }
}

// Initialize
new ShopifyChatIntegration();
