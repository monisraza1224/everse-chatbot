// Everse Shopify Chat Integration - Exact Measurements from Analysis
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

            // Create speech bubble with EXACT measurements
            const toggleButton = document.createElement('button');
            toggleButton.id = 'everse-chat-toggle';
            toggleButton.innerHTML = `
                <div class="bubble-inner">
                    <div class="bar-group">
                        <div class="bar bar-top"></div>
                        <div class="bar bar-middle"></div>
                        <div class="bar bar-bottom"></div>
                    </div>
                    <svg class="tail" viewBox="0 0 100 109" preserveAspectRatio="none">
                        <path d="M 18,100 L 6,109 L 12,100 Z" fill="#000000"/>
                    </svg>
                </div>
            `;
            toggleButton.style.cssText = `
                position: fixed;
                bottom: 25px;
                right: 25px;
                width: 70px;
                height: 70px;
                background: #FFFFFF;
                border: 2.5px solid #000000;
                border-radius: 12% 12% 12% 12%;
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

            // Add EXACT styles based on your measurements
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
                }

                .bar-group {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    width: 100%;
                    height: 30%;
                    justify-content: center;
                }

                .bar {
                    height: 6px;
                    border-radius: 3px;
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

                /* Tail with EXACT geometric measurements */
                .tail {
                    position: absolute;
                    bottom: -9%;
                    left: 6%;
                    width: 12%;
                    height: 9%;
                    z-index: -1;
                }

                /* Bubble outline with proper rounded corners */
                #everse-chat-toggle {
                    border-radius: 12% / 12%;
                    position: relative;
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
                        width: 60px;
                        height: 60px;
                    }
                    
                    .bar {
                        height: 5px;
                        border-radius: 2.5px;
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
            console.log('✅ Everse Chat Widget (Exact Measurements) injected');
        }
    }

    new ShopifyChatIntegration();
})();
