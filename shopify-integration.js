// Everse Shopify Chat Integration - Direct Chat Opening
(function() {
    'use strict';
    
    // Wait for page to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChat);
    } else {
        initChat();
    }

    function initChat() {
        // Check if already injected
        if (document.getElementById('everse-chat-widget')) {
            return;
        }

        // Create the chat widget container
        const chatWidget = document.createElement('div');
        chatWidget.id = 'everse-chat-widget';
        chatWidget.style.cssText = `
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
            background: white;
        `;

        // Create iframe inside the chat widget
        const iframe = document.createElement('iframe');
        iframe.src = 'https://everse-chatbot.onrender.com/chat-widget';
        iframe.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 16px;
        `;
        iframe.allow = 'microphone';

        // Create single chat toggle button
        const toggleButton = document.createElement('button');
        toggleButton.id = 'everse-chat-toggle';
        toggleButton.innerHTML = `
            <div style="position: relative; display: flex; align-items: center; justify-content: center;">
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
        `;
        toggleButton.style.cssText = `
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
            z-index: 10001;
            transition: all 0.3s ease;
        `;

        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            #everse-chat-toggle:hover {
                transform: scale(1.1);
                background: linear-gradient(135deg, #13294B 0%, #2E7D32 100%);
            }
            #everse-chat-widget.active {
                display: block !important;
            }
            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }
            @media (max-width: 480px) {
                #everse-chat-widget {
                    width: 90vw !important;
                    height: 70vh !important;
                    right: 5vw !important;
                    bottom: 80px !important;
                }
                #everse-chat-toggle {
                    bottom: 20px;
                    right: 20px;
                }
            }
        `;

        // Build the structure
        chatWidget.appendChild(iframe);
        
        // Add to page
        document.head.appendChild(styles);
        document.body.appendChild(chatWidget);
        document.body.appendChild(toggleButton);

        // Single click functionality - opens chat directly
        toggleButton.addEventListener('click', function() {
            chatWidget.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (chatWidget.classList.contains('active') && 
                !chatWidget.contains(e.target) && 
                !toggleButton.contains(e.target)) {
                chatWidget.classList.remove('active');
            }
        });

        console.log('✅ Everse Chat Widget loaded - Single click to open chat');
    }
})();
