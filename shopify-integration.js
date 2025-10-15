// Everse Shopify Chat Integration - Exact Speech Bubble Design
(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.everseChatInitialized) return;
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
            if (this.isInitialized || document.getElementById('everse-chat-toggle')) return;

            // Create iframe for chat
            const iframe = document.createElement('iframe');
            iframe.id = 'everse-chat-iframe';
            iframe.src = 'https://everse-chatbot.onrender.com/chat-widget';
            iframe.style.cssText = `
                position: fixed;
                bottom: 120px;
                right: 30px;
                width: 350px;
                height: 500px;
                border: none;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                display: none;
                background: white;
            `;

            // Create EXACT speech bubble button as specified
            const toggleButton = document.createElement('button');
            toggleButton.id = 'everse-chat-toggle';
            toggleButton.innerHTML = `
                <div class="chat-bubble-inner">
                    <div class="chat-line line-1"></div>
                    <div class="chat-line line-2"></div>
                    <div class="chat-line line-3"></div>
                </div>
            `;
            toggleButton.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 70px;
                height: 70px;
                background: #FFFFFF;
                border: 2px solid #000000;
                border-radius: 16px 16px 16px 4px;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10001;
                transform: scale(0) translateY(50px);
                animation: chatBounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                animation-delay: 0.5s;
                transition: all 0.3s ease;
            `;

            // Add EXACT styles as specified
            const styles = document.createElement('style');
            styles.textContent = `
                /* Speech bubble tail */
                #everse-chat-toggle::before {
                    content: '';
                    position: absolute;
                    bottom: -8px;
                    left: 10px;
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-top: 8px solid #000000;
                    transform: rotate(-45deg);
                }
                #everse-chat-toggle::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 11px;
                    width: 0;
                    height: 0;
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-top: 6px solid #FFFFFF;
                    transform: rotate(-45deg);
                    z-index: 2;
                }

                .chat-bubble-inner {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    position: relative;
                    z-index: 3;
                }

                .chat-line {
                    height: 3px;
                    border-radius: 2px;
                    background: #000;
                }

                /* EXACT specifications from your prompt */
                .line-1 {
                    width: 18px;  /* 70% of 26px = ~18px */
                    background-color: #8B8E90;
                }
                .line-2 {
                    width: 22px;  /* 85% of 26px = ~22px */
                    background-color: #317A87;
                }
                .line-3 {
                    width: 26px;  /* 100% = 26px */
                    background-color: #317A87;
                }

                #everse-chat-toggle:hover {
                    transform: scale(1.05) !important;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
                }

                #everse-chat-iframe.active {
                    display: block !important;
                }

                @keyframes chatBounceIn {
                    0% {
                        transform: scale(0) translateY(50px);
                        opacity: 0;
                    }
                    60% {
                        transform: scale(1.1) translateY(-5px);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1) translateY(0);
                        opacity: 1;
                    }
                }

                @media (max-width: 480px) {
                    #everse-chat-iframe {
                        width: 90vw !important;
                        height: 60vh !important;
                        right: 5vw !important;
                        bottom: 100px !important;
                    }
                    #everse-chat-toggle {
                        bottom: 20px;
                        right: 20px;
                    }
                }
            `;

            // Add to page
            document.head.appendChild(styles);
            document.body.appendChild(iframe);
            document.body.appendChild(toggleButton);

            // Toggle functionality
            toggleButton.addEventListener('click', () => {
                iframe.classList.toggle('active');
            });

            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (iframe.classList.contains('active') && 
                    !iframe.contains(e.target) && 
                    e.target !== toggleButton && 
                    !toggleButton.contains(e.target)) {
                    iframe.classList.remove('active');
                }
            });

            this.isInitialized = true;
            console.log('✅ Everse Chat Widget (Exact Speech Bubble) injected');
        }
    }

    new ShopifyChatIntegration();
})();
