// Everse Shopify Chat Integration - Speech Bubble Design
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
                bottom: 120px;
                right: 30px;
                width: 380px;
                height: 600px;
                border: none;
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.15);
                z-index: 10000;
                display: none;
            `;
            iframe.allow = 'microphone';

            // Create speech bubble chat toggle button
            const toggleButton = document.createElement('button');
            toggleButton.id = 'everse-chat-toggle';
            toggleButton.innerHTML = `
                <div class="chat-lines">
                    <div class="line line-top"></div>
                    <div class="line line-middle"></div>
                    <div class="line line-bottom"></div>
                </div>
            `;
            toggleButton.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 70px;
                height: 70px;
                background: #FFFFFF;
                border: 2.5px solid #000000;
                border-radius: 18px 18px 18px 4px;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10001;
                transform: scale(0) translateY(50px);
                animation: slideUpBounce 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                animation-delay: 0.5s;
                transition: all 0.3s ease;
            `;

            // Add styles for speech bubble button
            const styles = document.createElement('style');
            styles.textContent = `
                #everse-chat-toggle:hover {
                    transform: scale(1.05) !important;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2) !important;
                }
                
                /* Diagonal tail at bottom-left */
                #everse-chat-toggle::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 8px;
                    width: 0;
                    height: 0;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-top: 10px solid #000000;
                    transform: rotate(-45deg);
                }

                #everse-chat-toggle::before {
                    content: '';
                    position: absolute;
                    bottom: -7px;
                    left: 10px;
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-top: 8px solid #FFFFFF;
                    transform: rotate(-45deg);
                    z-index: 1;
                }
                
                .chat-lines {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    margin-bottom: 5px;
                    position: relative;
                    z-index: 2;
                }
                
                .line {
                    height: 3.5px;
                    border-radius: 2px;
                    background: #000;
                }
                
                .line-top {
                    width: 18px;
                    background-color: #8B8E90;
                }
                
                .line-middle {
                    width: 22px;
                    background-color: #317A87;
                }
                
                .line-bottom {
                    width: 26px;
                    background-color: #317A87;
                }
                
                #everse-chat-iframe.active {
                    display: block !important;
                }
                
                @keyframes slideUpBounce {
                    0% {
                        transform: scale(0) translateY(50px);
                        opacity: 0;
                    }
                    60% {
                        transform: scale(1.1) translateY(-8px);
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
                        height: 70vh !important;
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
            console.log('✅ Everse Chat Widget (Speech Bubble) injected successfully');
        }
    }

    // Initialize
    new ShopifyChatIntegration();
})();
