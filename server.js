const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Production CORS settings
app.use(cors({
  origin: [
    'https://eversetraveltech.com',
    'https://www.eversetraveltech.com',
    'http://localhost:3000'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.static(__dirname));
// Routes
app.use('/api/chat', require('./openai-service'));
app.use('/api/shopify', require('./shopify-api'));

// Serve chat widget
app.get('/chat-widget', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/chat-widget.html'));
});

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
      chat: '/api/chat',
      health: '/health',
      widget: '/chat-widget'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Everse Chatbot running on port ${PORT}`);
  console.log(`🌐 Ready for production`);

});
