const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Complete product database with exact names, prices, and URLs
const productDatabase = [
  // NEXUS SERIES HEAD UNITS
  {
    name: "Nexus 10.1\" Universal Head Unit",
    price: "$1,199.00",
    url: "https://eversetraveltech.com/products/nexus-10-1-universal-head-unit-copy"
  },
  {
    name: "Nexus RS 10.1\" Universal Head Unit",
    price: "$1,499.00",
    url: "https://eversetraveltech.com/products/nexus"
  },
  {
    name: "Nexus Pro 13.3\" Universal Head Unit",
    price: "$1,799.00",
    url: "https://eversetraveltech.com/products/nexus-pro"
  },
  {
    name: "Nexus Pro RS 13.3\" Universal Head Unit",
    price: "$1,899.00",
    url: "https://eversetraveltech.com/products/nexus-pro-rs-13-3-universal-head-unit"
  },

  // ELITE SERIES PLUG & PLAY
  {
    name: "Nissan Patrol Y61 2004-2015 (Black) Plug & Play Elite Head Unit",
    price: "$899.00",
    url: "https://eversetraveltech.com/products/nissan-patrol-s4-2004-2015-plug-play-elite-head-unit"
  },
  {
    name: "Nissan Patrol Y61 2004-2015 (Silver) Plug & Play Elite Head Unit",
    price: "$899.00",
    url: "https://eversetraveltech.com/products/nissan-patrol-s4-2004-2015-silver-plug-play-elite-head-unit"
  },
  {
    name: "Toyota Hilux N70 2008-2014 Plug & Play Elite Head Unit",
    price: "$899.00",
    url: "https://eversetraveltech.com/products/toyota-hilux-n70-2008-2014-plug-play-elite-head-unit"
  },
  {
    name: "Toyota Hilux N70 2005-2014 Plug & Play Elite Head Unit",
    price: "$899.00",
    url: "https://eversetraveltech.com/products/toyota-hilux-n70-manual-ac-2005-2014"
  },

  // CAMERAS & MONITORS
  {
    name: "Nexus Reverse Camera",
    price: "$89.00",
    url: "https://eversetraveltech.com/products/reverse-camera"
  },
  {
    name: "HD Dash Camera",
    price: "$129.00",
    url: "https://eversetraveltech.com/products/hd-dash-camera"
  },
  {
    name: "Dual Vision™ Monitor",
    price: "$249.00",
    url: "https://eversetraveltech.com/products/dual-vison™-monitor-copy"
  },

  // ACCESSORIES & ADAPTORS
  {
    name: "Toyota ISO Adaptor",
    price: "$59.00",
    url: "https://eversetraveltech.com/products/toyota-iso-adaptor"
  },
  {
    name: "Bluetooth OBD2 Reader",
    price: "$129.00",
    url: "https://eversetraveltech.com/products/bluetooth-obd2-reader"
  },
  {
    name: "S4 GU Patrol/D22 Navara ISO Adaptor",
    price: "$59.00",
    url: "https://eversetraveltech.com/products/s4-gu-patrol-iso-adaptor"
  },
  {
    name: "Tyre Pressure Monitoring System (TPMS)",
    price: "$119.00",
    url: "https://eversetraveltech.com/products/tyre-pressure-monitoring-system-tpms"
  },

  // LIGHTING & TOOLS
  {
    name: "Two Tone™ Strip Light",
    price: "$74.95",
    url: "https://eversetraveltech.com/products/dual-vison-mirror"
  },
  {
    name: "Car Trim Pull Kit + Wire Snake",
    price: "$69.99",
    url: "https://eversetraveltech.com/products/car-trim-pull-kit-wire-snake"
  }
];

// EVERSE MASTER PLAYBOOK - Complete Knowledge Base
const SYSTEM_PROMPT = `You are a customer support specialist for EVerse, a premium vehicle technology company. Use this complete playbook for all responses.

BRAND PHILOSOPHY:
At Everse, we believe vehicles are more than machines — they are companions in adventure, freedom, and everyday life. We design modern, rugged, intuitive products that bring cutting-edge connectivity to both classic icons and new-generation machines.

PRODUCT LINES:
• Nexus Series: Universal upgrade head units with bold floating displays (10.1" & 13.3")
• Elite Series: Vehicle-specific units with OEM fit and modern functionality
• Revio Series: World's first motorcycle head unit with 7" removable waterproof display

VOICE & SUPPORT RULES:
• Be decisive, straight, friendly, professional with human touch
• Always polite and apologetic if customer has issues
• Provide quick, helpful responses - keep it simple and fast
• After 1-3 quick checks, request proof (order #, photos/videos)
• Always propose a next step
• Never promise warranty/refund until proof is confirmed

KEY POLICIES:
SHIPPING:
• Free shipping over $250 AU/NZ
• Standard delivery: 2-7 business days
• International shipping available
• Tracking emailed when dispatched

RETURNS & REFUNDS:
• 30-day returns for unused items in original packaging
• No change of mind returns
• Refunds: 15% restocking fee, shipping not refunded
• Store credit option available

WARRANTY:
• 1 Year Warranty minimum
• Excludes misuse/incorrect installation
• Claims require order number and proof (photo/video)

PAYMENT METHODS:
Visa, Mastercard, AMEX, Apple Pay, Google Pay, PayPal, Afterpay, Zip

INSTALLATION BASICS:
• Wiring: Red = ACC, Yellow = 12V constant, Black = Ground
• Use provided harnesses; avoid splicing
• Post-install test: radio, Bluetooth, camera integration

IMPORTANT FORMATTING RULES:
1. When recommending products, use EXACT product names from our catalog
2. Always include the price
3. Use this format for product mentions: [PRODUCT]Exact Product Name[/PRODUCT]
4. Keep responses concise and helpful
5. Focus on solving customer issues quickly

CONTACT ESCALATION:
For complex technical issues or warranty claims requiring human review, provide: Sales@eversetraveltech.com

AVAILABLE PRODUCTS:
${productDatabase.map(p => `- ${p.name} - ${p.price}`).join('\n')}

STORE: https://eversetraveltech.com
CONTACT: Sales@eversetraveltech.com

Focus on quick, helpful responses. Provide essential information only.`;

async function chatWithAI(message, conversationHistory = []) {
  try {
    const enhancedPrompt = `${SYSTEM_PROMPT}

Customer Question: "${message}"

Provide a quick, helpful response. Recommend relevant products using exact product names in [PRODUCT]Product Name[/PRODUCT] format with prices. Keep it simple and fast.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: enhancedPrompt },
        ...conversationHistory,
        { role: "user", content: message }
      ],
      max_tokens: 400, // Shorter responses for faster replies
      temperature: 0.7
    });

    let response = completion.choices[0].message.content;
    
    // Convert product tags to actual product links with prices
    response = convertProductTagsToLinks(response);
    
    // Add contact email styling
    response = response.replace(/Sales@eversetraveltech\.com/g, 
      '<a href="mailto:Sales@eversetraveltech.com" class="contact-email">Sales@eversetraveltech.com</a>'
    );

    return response;

  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Sorry, I encountered an error. Please try again or contact Sales@eversetraveltech.com.');
  }
}

function convertProductTagsToLinks(text) {
  return text.replace(/\[PRODUCT\](.*?)\[\/PRODUCT\]/g, (match, productName) => {
    const cleanProductName = productName.trim();
    
    // Find the best matching product
    const product = findBestProductMatch(cleanProductName);
    
    if (product) {
      return `<a href="${product.url}" target="_blank" class="product-link">${product.name} - ${product.price}</a>`;
    } else {
      // Fallback to store search
      const searchQuery = encodeURIComponent(cleanProductName);
      return `<a href="https://eversetraveltech.com/search?q=${searchQuery}" target="_blank" class="product-link">${cleanProductName}</a>`;
    }
  });
}

function findBestProductMatch(productName) {
  const cleanQuery = productName.toLowerCase().trim();
  
  // Exact match
  let product = productDatabase.find(p => 
    p.name.toLowerCase() === cleanQuery
  );
  
  // Partial match
  if (!product) {
    product = productDatabase.find(p => 
      p.name.toLowerCase().includes(cleanQuery) || 
      cleanQuery.includes(p.name.toLowerCase())
    );
  }
  
  // Keyword match
  if (!product) {
    const keywords = cleanQuery.split(' ');
    product = productDatabase.find(p => 
      keywords.some(keyword => p.name.toLowerCase().includes(keyword))
    );
  }
  
  return product;
}

module.exports = { chatWithAI };
