// Everse Shopify Chat Integration - Guaranteed Working Version
(function() {
    'use strict';
    
    class ShopifyChatIntegration {
        constructor() {
            this.isInitialized = false;
            this.init();
        }

        init() {
            // Wait for full page load
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    setTimeout(() => this.injectChatWidget(), 1000);
                });
            } else {
                setTimeout(() => this.injectChatWidget(), 1000);
            }
        }

        injectChatWidget() {
            if (this.isInitialized || document.getElementById('everse-chat-container')) return;

            const chatHTML = `
                <div id="everse-chat-container">
                    <iframe 
                        id="everse-chat-iframe" 
                        src="https://everse-chatbot.onrender.com/chat-widget" 
                        style="
                            position: fixed;
                            bottom: 95px;
                            right: 25px;
                            width: 380px;
                            height: 600px;
                            border: none;
                            border-radius: 16px;
                            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
                            z-index: 10000;
                            display: none;
                        "
                        allow="microphone"
                    ></iframe>
                    
                    <button id="everse-chat-toggle" style="
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
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">
                        <div style="position: relative;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <rect x="4" y="7" width="16" height="2"></rect>
                                <rect x="4" y="11" width="16" height="2"></rect>
                                <rect x="4" y="15" width="16" height="2"></rect>
                            </svg>
                            <span style="
                                position: absolute;
                                top: -2px;
                                right: -2px;
                                width: 12px;
                                height: 12px;
                                background: #00C853;
                                border-radius: 50%;
                                border: 2px solid white;
                                animation: pulse 2s infinite;
                            "></span>
                        </div>
                    </button>
                </div>
                
                <style>
                    #everse-chat-toggle:hover {
                        transform: scale(1.1);
                        background: linear-gradient(135deg, #13294B 0%, #2E7D32 100%) !important;
                    }
                    
                    #everse-chat-iframe.active {
                        display: block !important;
                    }
                    
                    @keyframes pulse {
                        0% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.2); opacity: 0.7; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                    
                    @media (max-width: 480px) {
                        #everse-chat-iframe {
                            width: 90vw !important;
                            height: 70vh !important;
                            right: 5vw !important;
                            bottom: 80px !important;
                        }
                    }
                </style>
            `;

            // Create container and inject HTML
            const container = document.createElement('div');
            container.innerHTML = chatHTML;
            document.body.appendChild(container);

            // Add event listeners
            const toggleButton = document.getElementById('everse-chat-toggle');
            const iframe = document.getElementById('everse-chat-iframe');

            if (toggleButton && iframe) {
                toggleButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    iframe.classList.toggle('active');
                });

                // Close when clicking outside
                document.addEventListener('click', function(e) {
                    if (!iframe.contains(e.target) && !toggleButton.contains(e.target)) {
                        iframe.classList.remove('active');
                    }
                });

                // Prevent iframe clicks from closing
                iframe.addEventListener('click', function(e) {
                    e.stopPropagation();
                });

                this.isInitialized = true;
                console.log('✅ Everse Chat Widget successfully initialized');
            }
        }
    }

    // Initialize with error handling
    try {
        new ShopifyChatIntegration();
    } catch (error) {
        console.error('Everse Chat Widget initialization error:', error);
    }
})();
