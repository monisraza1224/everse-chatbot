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
        overflow: visible;
    }

    .bar-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* bars start from left */
        gap: 6px;
        width: 100%;
        height: 30%;
        justify-content: center;
        position: relative;
        left: 20%; /* shift bars group toward right center */
    }

    .bar {
        height: 6px;
        border-radius: 3px;
    }

    /* Correct lengths (top shortest, bottom longest) — aligned left */
    .bar-top {
        width: 20.31%;
        background-color: #9B9B9B;
        margin-left: 0;
    }

    .bar-middle {
        width: 17.37%;
        background-color: #5390A2;
        margin-left: 3%;
    }

    .bar-bottom {
        width: 20.87%;
        background-color: #5290A2;
        margin-left: 6%;
    }

    /* Tail corrected — positioned bottom-left and angled properly */
    .tail {
        position: absolute;
        bottom: -9%;
        left: 6%;
        width: 22%;
        height: 12%;
    }
    .tail path {
        fill: #000000;
        d: path("M 18,100 L 6,109 L 12,100 Z");
    }

    /* Bubble outline + shape refined */
    #everse-chat-toggle {
        border-radius: 25%;
        border: 2.5px solid #000000;
        background: #FFFFFF;
        position: relative;
        overflow: visible;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    }

    #everse-chat-toggle:hover {
        transform: scale(1.05) !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
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
