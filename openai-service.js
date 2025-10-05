const OpenAI = require('openai');
const { ProductMapper } = require('./product-mapper');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Professional system prompt for Everse
const SYSTEM_PROMPT = `You are a professional customer support specialist for EVerse, a premium vehicle technology company.

CRITICAL FORMATTING RULES:
1. When recommending products, use EXACT product names
2. ALWAYS include pricing
3. Use EXACT format for product links: [PRODUCT]Exact Product Name[/PRODUCT]
4. Be direct and provide all necessary information

CONTACT ESCALATION:
- If you cannot solve the issue, provide: Sales@eversetraveltech.com

STORE POLICIES:
• Free shipping over $250 AU/NZ
• 2-7 day standard delivery
• Contact email: Sales@eversetraveltech.com`;

async function chatWithAI(message, conversationHistory = [], products = []) {
  try {
    const enhancedPrompt = `${SYSTEM_PROMPT}

Customer Question: "${message}"

Provide a helpful response with exact pricing and recommend relevant products using [PRODUCT]Exact Product Name[/PRODUCT] format.`;

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
    
    // Convert product tags to links
    response = convertProductTagsToLinks(response);
    
    // Add contact email styling
    response = response.replace(/Sales@eversetraveltech\.com/g, 
      '<a href="mailto:Sales@eversetraveltech.com" class="contact-email">Sales@eversetraveltech.com</a>'
    );

    return response;

  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to process message');
  }
}

function convertProductTagsToLinks(text) {
  return text.replace(/\[PRODUCT\](.*?)\[\/PRODUCT\]/g, (match, productName) => {
    const cleanProductName = productName.trim();
    return `<a href="/products" target="_blank" class="product-link">${cleanProductName}</a>`;
  });
}

module.exports = { chatWithAI };
