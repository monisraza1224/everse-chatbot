const express = require('express');
const OpenAI = require('openai');
const axios = require('axios');
const { ProductMapper } = require('./product-mapper');
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Professional system prompt for Everse - UPDATED WITH CONTACT EMAIL
const SYSTEM_PROMPT = `You are a professional customer support specialist for EVerse, a premium vehicle technology company.

CRITICAL FORMATTING RULES:
1. When recommending products, use EXACT product names from this list:
   
   NEXUS SERIES:
   - "Nexus 10.1\\" Universal Head Unit" - $1,199.00
   - "Nexus RS 10.1\\" Universal Head Unit" - $1,499.00  
   - "Nexus Pro 13.3\\" - Universal Head Unit" - $1,799.00
   - "Nexus Pro RS 13.3\\" - Universal Head Unit" - $1,899.00

   ELITE SERIES:
   - "Nissan Patrol Y61 2004 - 2015 (Black) Plug & Play Elite Head Unit" - $899.00
   - "Nissan Patrol Y61 2004 - 2015 (Silver) Plug & Play Elite Head Unit" - $899.00
   - "Toyota Hilux N70 2008 - 2014 Plug & Play Elite Head Unit" - $899.00
   - "Toyota Hilux N70 2005 - 2014 Plug & Play Elite Head Unit" - $899.00

   ACCESSORIES & CAMERAS:
   - "Nexus Reverse Camera" - $89.00
   - "Toyota ISO Adaptor" - $59.00
   - "Bluetooth OBD2 reader" - $129.00
   - "S4 GU Patrol/D22 Navara ISO Adaptor" - $59.00
   - "Tyre Pressure Monitoring System (TPMS)" - $119.00
   - "HD Dash Camera" - $129.00
   - "Two Tone™ Strip Light" - $74.95
   - "Car Trim Pull Kit + Wire Snake" - $69.99
   - "Dual Vison™ Monitor" - $249.00

2. ALWAYS include pricing - customers need this information
3. Use EXACT format for product links: [PRODUCT]Exact Product Name[/PRODUCT]
4. Be direct and provide all necessary information
5. Focus on helping customers find the right product for their vehicle

CONTACT ESCALATION:
- If you cannot solve the issue or the customer requests human assistance
- If it's a complex technical issue beyond basic support
- If the customer wants to speak with sales directly
ALWAYS provide this email: Sales@eversetraveltech.com

STORE POLICIES:
• Free shipping over $250 AU/NZ
• 2-7 day standard delivery
• 30-day returns (unused items)
• 1-year warranty
• Contact email: Sales@eversetraveltech.com

Always provide accurate pricing and product recommendations. If you cannot help fully, direct them to Sales@eversetraveltech.com for personalized assistance.`;

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    // Get all available products from our database
    const allProducts = ProductMapper.getAllProducts();

    // Create enhanced prompt with exact product data
    const enhancedPrompt = `${SYSTEM_PROMPT}

Customer Question: "${message}"

Provide a helpful response with exact pricing and recommend relevant products using [PRODUCT]Exact Product Name[/PRODUCT] format. If you cannot fully resolve their issue, direct them to Sales@eversetraveltech.com.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: enhancedPrompt },
        ...conversationHistory,
        { role: "user", content: message }
      ],
      max_tokens: 600,
      temperature: 0.7
    });

    let response = completion.choices[0].message.content;
    
    // Convert product tags to actual Shopify links using our exact product database
    response = convertProductTagsToLinks(response, allProducts);
    
    // Add contact email styling
    response = response.replace(/Sales@eversetraveltech\.com/g, 
      '<a href="mailto:Sales@eversetraveltech.com" class="contact-email">Sales@eversetraveltech.com</a>'
    );

    res.json({ response, products: allProducts });

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Convert [PRODUCT] tags to actual Shopify links - USING EXACT PRODUCT DATABASE
function convertProductTagsToLinks(text, products) {
  return text.replace(/\[PRODUCT\](.*?)\[\/PRODUCT\]/g, (match, productName) => {
    const cleanProductName = productName.trim();
    
    console.log(`🔍 Looking for product: "${cleanProductName}"`);
    
    // Find the exact product in our database
    const product = ProductMapper.findProductByTitle(cleanProductName);
    
    if (product) {
      const productUrl = ProductMapper.generateProductLink(product);
      console.log(`✅ EXACT MATCH: "${cleanProductName}" -> ${productUrl}`);
      return `<a href="${productUrl}" target="_blank" class="product-link">${cleanProductName} - ${product.price}</a>`;
    } else {
      console.log(`❌ NO MATCH: "${cleanProductName}"`);
      // Return the product name without link if no exact match found
      return `<strong>${cleanProductName}</strong>`;
    }
  });
}

module.exports = router;