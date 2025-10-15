// Everse Shopify Chat Integration - Rectangular Button Design
(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.everseChatInitialized) {
        console.log('🔄 Everse Chat already initialized, skipping...');
        return;
    }
    window.everseChatInitialized = true;

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
            if (this.isInitialized || document.getElementById('everse-chat-toggle')) {
                console.log('⚠️ Everse Chat widget already exists, skipping...');
                return;
            }

            // Create iframe for chat
            const iframe = document.createElement('iframe');
            iframe.id = 'everse-chat-iframe';
            iframe.src = 'https://everse-chatbot.onrender.com/chat-widget';
            iframe.style.cssText = `
                position: fixed;
                bottom: 100px;
                right: 25px;
                width: 380px;
                height: 600px;
                border: none;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.15);
                z-index: 10000;
                display: none;
            `;
            iframe.allow = 'microphone';

            // Create rectangular chat toggle button
            const toggleButton = document.createElement('button');
            toggleButton.id = 'everse-chat-toggle';
            toggleButton.innerHTML = `
                <div class="chat-icon">
                    <div class="chat-line line-1"></div>
                    <div class="chat-line line-2"></div>
                    <div class="chat-line line-3"></div>
                </div>
                <span class="chat-text">Chat</span>
            `;
            toggleButton.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 120px;
                height: 50px;
                background: linear-gradient(135deg, #3A7C84 0%, #2A5C63 100%);
                border: none;
                border-radius: 8px;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(58, 124, 132, 0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                z-index: 10001;
                transform: scale(0);
                animation: slideIn 0.6s ease-out forwards;
                animation-delay: 0.5s;
                transition: all 0.3s ease;
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-weight: 600;
                font-size: 14px;
            `;

            // Add styles for rectangular button
            const styles = document.createElement('style');
            styles.textContent = `
                #everse-chat-toggle:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 6px 20px rgba(58, 124, 132, 0.4) !important;
                    background: linear-gradient(135deg, #4A8C94 0%, #3A6C73 100%) !important;
                }
                
                .chat-icon {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }
                
                .chat-line {
                    height: 2px;
                    border-radius: 1px;
                    background: white;
                    transition: all 0.3s ease;
                }
                
                .line-1 { width: 12px; }
                .line-2 { width: 16px; }
                .line-3 { width: 12px; }
                
                #everse-chat-toggle:hover .chat-line {
                    width: 16px;
                }
                
                .chat-text {
                    font-weight: 600;
                }
                
                #everse-chat-iframe.active {
                    display: block !important;
                }
                
                @keyframes slideIn {
                    0% {
                        transform: translateX(100px) scale(0.8);
                        opacity: 0;
                    }
                    70% {
                        transform: translateX(-10px) scale(1.05);
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(0) scale(1);
                        opacity: 1;
                    }
                }
                
                @media (max-width: 480px) {
                    #everse-chat-iframe {
                        width: 90vw !important;
                        height: 70vh !important;
                        right: 5vw !important;
                        bottom: 90px !important;
                    }
                    #everse-chat-toggle {
                        bottom: 20px;
                        right: 20px;
                        width: 110px;
                        height: 45px;
                        font-size: 13px;
                    }
                }
            `;

            // Add to page
            document.head.appendChild(styles);
            document.body.appendChild(iframe);
            document.body.appendChild(toggleButton);

            // Toggle functionality
            toggleButton.addEventListener('click', function() {
                iframe.classList.toggle('active');
            });

            // Close when clicking outside
            document.addEventListener('click', function(e) {
                if (iframe.classList.contains('active') && 
                    !iframe.contains(e.target) && 
                    !toggleButton.contains(e.target)) {
                    iframe.classList.remove('active');
                }
            });

            this.isInitialized = true;
            console.log('✅ Everse Chat Widget (Rectangular) injected successfully');
        }
    }

    // Initialize
    new ShopifyChatIntegration();
})();
