// Everse Shopify Chat Integration - "E" Shape Speech Bubble Design
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
                bottom: 110px;
                right: 25px;
                width: 350px;
                height: 500px;
                border: none;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                display: none;
                background: white;
            `;

            // Create "E" shape speech bubble button
            const toggleButton = document.createElement('button');
            toggleButton.id = 'everse-chat-toggle';
            toggleButton.innerHTML = `
                <div class="e-shape">
                    <div class="e-line e-top"></div>
                    <div class="e-line e-middle"></div>
                    <div class="e-line e-bottom"></div>
                </div>
            `;
            toggleButton.style.cssText = `
                position: fixed;
                bottom: 25px;
                right: 25px;
                width: 60px;
                height: 60px;
                background: #FFFFFF;
                border: 2px solid #000000;
                border-radius: 14px 14px 14px 4px;
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

            // Add styles for "E" shape button
            const styles = document.createElement('style');
            styles.textContent = `
                /* Speech bubble tail */
                #everse-chat-toggle::before {
                    content: '';
                    position: absolute;
                    bottom: -7px;
                    left: 8px;
                    width: 0;
                    height: 0;
                    border-left: 7px solid transparent;
                    border-right: 7px solid transparent;
                    border-top: 7px solid #000000;
                    transform: rotate(-45deg);
                }
                #everse-chat-toggle::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 9px;
                    width: 0;
                    height: 0;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-top: 5px solid #FFFFFF;
                    transform: rotate(-45deg);
                    z-index: 2;
                }

                /* "E" shape styling - three horizontal lines forming E shape */
                .e-shape {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 4px;
                    position: relative;
                    z-index: 3;
                    margin-left: 12px;
                }

                .e-line {
                    height: 3px;
                    border-radius: 2px;
                    background: #000;
                }

                /* "E" shape lines - top and bottom are longer, middle is shorter */
                .e-top {
                    width: 20px;
                    background-color: #8B8E90;
                }
                .e-middle {
                    width: 16px;  /* Shorter than top and bottom */
                    background-color: #317A87;
                }
                .e-bottom {
                    width: 20px;
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
                        bottom: 90px !important;
                    }
                    #everse-chat-toggle {
                        bottom: 15px;
                        right: 15px;
                        width: 55px;
                        height: 55px;
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
            console.log('✅ Everse Chat Widget ("E" Shape Speech Bubble) injected');
        }
    }

    new ShopifyChatIntegration();
})();
