require('dotenv').config();

module.exports = {
    shopify: {
        storeUrl: process.env.SHOPIFY_STORE_URL,
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
        apiVersion: '2024-01'
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY
    },
    server: {
        port: process.env.PORT || 3000
    }
};
