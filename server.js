const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS for production
app.use(cors({
  origin: ['https://eversetraveltech.com', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.static(__dirname));

// Import routes
const chatRoutes = require('./openai-service');
const shopifyRoutes = require('./shopify-api');

// Use routes
app.use('/api/chat', chatRoutes);
app.use('/api/shopify', shopifyRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Everse Chatbot API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Everse Chatbot API', 
    status: 'running',
    endpoints: {
      chat: 'POST /api/chat',
      health: '/health',
      widget: '/chat-widget'
    }
  });
});

// Serve chat widget
app.get('/chat-widget', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat-widget.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Everse Chatbot running on port ${PORT}`);
  console.log(`🌐 Ready for production`);
});

