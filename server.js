const express = require('express');
const path = require('path');
const { chatWithAI } = require('./openai-service');
const { getProducts, searchProducts } = require('./shopify-api');

const app = express();
app.use(express.json());

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname)));

// Serve the main chat widget page
app.get('/chat-widget', (req, res) => {
    res.sendFile(path.join(__dirname, 'chat-widget.html'));
});

// Serve shopify-integration.js
app.get('/shopify-integration.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'shopify-integration.js'));
});

// Serve chat-widget.css
app.get('/chat-widget.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'chat-widget.css'));
});

// Serve chat-widget.js
app.get('/chat-widget.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'chat-widget.js'));
});

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get products from Shopify for context
        let products = [];
        try {
            products = await getProducts();
        } catch (error) {
            console.error('Error fetching products:', error);
        }

        const response = await chatWithAI(message, conversationHistory, products);
        res.json({ response });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            response: 'Sorry, I encountered an error. Please try again or contact our support team directly at Sales@eversetraveltech.com.'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Everse Chatbot is running' });
});

// Product search endpoint (if needed)
app.get('/api/products', async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Everse Chatbot running on port ${PORT}`);
    console.log('🌐 Ready for production');
    console.log('📊 Available routes:');
    console.log('   GET  /chat-widget');
    console.log('   GET  /shopify-integration.js');
    console.log('   GET  /chat-widget.css');
    console.log('   GET  /chat-widget.js');
    console.log('   POST /api/chat');
});


