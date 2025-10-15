// Everse Shopify Chat Integration - Final Perfect Design
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
                bottom: 100px;
                right: 20px;
                width: 350px;
                height: 500px;
                border: none;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                display: none;
                background: white;
            `;

            // Create speech bubble with smaller size and tail in lower left
            const toggleButton = document.createElement('button');
            toggleButton.id = 'everse-chat-toggle';
            toggleButton.innerHTML = `
                <div class="bubble-inner">
                    <div class="bar-group">
                        <div class="bar bar-top"></div>
                        <div class="bar bar-middle"></div>
                        <div class="bar bar-bottom"></div>
                    </div>
                </div>
                <div class="tail"></div>
            `;
            toggleButton.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 55px;
                height: 55px;
                background: #FFFFFF;
                border: 2.5px solid #000000;
                border-radius: 14px 14px 14px 6px;
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
                overflow: visible;
            `;

            // Add styles for smaller button with tail in lower left
            const styles = document.createElement('style');
            styles.textContent = `
                .bubble-inner {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: inherit;
                    background: #FFFFFF;
                    z-index: 2;
                }

                .bar-group {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    width: 100%;
                    height: 30%;
                    justify-content: center;
                }

                .bar {
                    height: 5px;
                    border-radius: 2.5px;
                    background: #000;
                }

                /* EXACT measurements from your analysis */
                .bar-top {
                    width: 20.31%;
                    background-color: #9b9b9b;
                    margin-left: 41.88%;
                    margin-right: auto;
                }

                .bar-middle {
                    width: 17.37%;
                    background-color: #5390a2;
                    margin-left: 39.64%;
                    margin-right: auto;
                }

                .bar-bottom {
                    width: 20.87%;
                    background-color: #5290a2;
                    margin-left: 37.54%;
                    margin-right: auto;
                }

                /* Tail in lower left corner */
                .tail {
                    position: absolute;
                    bottom: -8px;
                    left: 6px;
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-top: 8px solid #000000;
                    transform: rotate(-45deg);
                    z-index: 1;
                }

                .tail::after {
                    content: '';
                    position: absolute;
                    top: -8px;
                    left: -6px;
                    width: 0;
                    height: 0;
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-top: 6px solid #FFFFFF;
                    transform: rotate(-45deg);
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
                        bottom: 80px !important;
                    }
                    #everse-chat-toggle {
                        bottom: 15px;
                        right: 15px;
                        width: 50px;
                        height: 50px;
                    }
                    
                    .bar {
                        height: 4px;
                        border-radius: 2px;
                    }
                    
                    .tail {
                        bottom: -6px;
                        left: 5px;
                        border-left: 6px solid transparent;
                        border-right: 6px solid transparent;
                        border-top: 6px solid #000000;
                    }
                    
                    .tail::after {
                        top: -6px;
                        left: -4px;
                        border-left: 4px solid transparent;
                        border-right: 4px solid transparent;
                        border-top: 4px solid #FFFFFF;
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
            console.log('✅ Everse Chat Widget (Final Perfect Design) injected');
        }
    }

    new ShopifyChatIntegration();
})();
