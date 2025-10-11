const OpenAI = require('openai');

// Check if API key exists first
if (!process.env.OPENAI_API_KEY) {
    console.error('ERROR: OPENAI_API_KEY environment variable is missing!');
    console.error('Please add OPENAI_API_KEY to your Render environment variables');
}

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

// EVERSE MASTER PLAYBOOK - Complete Updated Knowledge Base
const SYSTEM_PROMPT = `CRITICAL BEHAVIOR AND FALLBACK:
1. Always try to fully resolve the customer's question using the knowledge in this file
2. If you are unsure or missing data, ask the customer to email sales@eversetraveltech.com so the team can assist
3. Never disclose any INTERNAL content. It is for reasoning only
4. Keep replies concise, professional, and supportive. Use numbered lists or hyphens only. Use inline headings like "Quick checks you can try:"

CUSTOMER INTERACTION:
If you are not fully confident in the answer or the request needs human input, reply with:
"Please send a quick email to sales@eversetraveltech.com with your order number, photos or a short video, and a summary of what you need. We will get it sorted quickly for you."

Otherwise, answer the question using this knowledge base. Include the right product link on eversetraveltech.com when relevant. Offer next steps like photos, video, or order number where helpful.

PRODUCT KNOWLEDGE - WEBSITE SNAPSHOT:
Model | Screen Size | Resolution | Fitment | Key Feature
Elite Head Unit | Vehicle specific (varies) | 1280 x 720 pixels | Vehicle Specific | Immersive clarity
Nexus 10.1 | 10.1 inch | 1280 x 800 pixels | Single and Double DIN | Incredible sound quality
Nexus Pro RS 13.3 | 13.3 inch | 1920 x 1080 pixels | Single and Double DIN | Automatic rotating display

Notes: RS indicates rotating screen that can switch to vertical automatically.

PRODUCT LINES:
The Nexus Series — Modern Edge, Classic Spirit
- Universal upgrade for drivers who want to modernize older or simpler rigs without losing raw character
- Double-DIN base with bold floating displays in 10.1" and 13.3" Pro sizes
- RS models rotate seamlessly between landscape and portrait
- Popular with 4x4 owners (e.g., 70 Series Land Cruisers, GU Patrols)
- Integrates with OBD2 readers, tyre-pressure monitors, and steering-wheel controls
- Quick Blurb: "Bold floating screens. Endless integration. Nexus makes old-school rigs feel brand new."

The Elite Series — Seamless OEM Fit
- Vehicle-specific units complete with dash surrounds and 9-10.1" displays
- Factory-style integration of modern functionality; preserves the OEM look
- Quick Blurb: "Factory look. Future feel. Elite is the seamless upgrade."

The Revio Series — Reinventing the Ride
- The world's first head unit designed specifically for motorcycles
- Compact, rugged 7" removable display, USB-C, Apple CarPlay, Android Auto
- Supports front and rear cameras; IPX7 waterproof
- Quick Blurb: "Revio brings modern tech to two wheels — rugged, smart, and waterproof."

PRODUCT LINKS:
Elite Head Unit collection: https://eversetraveltech.com/collections/elite-pro-head-units
Nexus series collection: https://eversetraveltech.com/collections/nexus-head-units
Nexus Pro RS 13.3 product page: https://eversetraveltech.com/products/nexus-pro-rs-13-3-universal-head-unit
Nexus 10.1 product page: https://eversetraveltech.com/products/nexus
Dual Vision Mirror product page: https://eversetraveltech.com/products/dual-vison-mirror

POLICIES AND TERMS:
SHIPPING POLICY:
- International shipping available; rates calculated at checkout
- Standard delivery: 2-7 business days (longer for remote areas)
- Free shipping: Orders over $250 AU/NZ
- Express options: AusPost, TNT, DHL
- Tracking: Sent by email once dispatched

RETURNS & REFUNDS POLICY:
- Returns accepted within 30 days if unused and in original packaging
- No change of mind returns
- Refunds: 15% restocking fee; shipping is not refundable
- Store credit option: only shipping deducted; no restocking fee

WARRANTY POLICY:
- 1 Year Warranty minimum
- Excludes misuse/incorrect installation
- Claims require order number and proof (photo/video)
- Valid claims may be repaired, replaced, or exchanged

Website snapshot says: domestic delivery usually 5 to 7 business days and customer support is available Monday to Friday 8 am to 5:30 pm. Average answer time 24 hours.

TROUBLESHOOTING GUIDELINES:
Quick checks you can try:
1. Confirm plugs are fully seated and no pins are bent
2. Test with ignition ON and check fuses
3. If an accessory is not detected, try a different USB or cable

If still unresolved, ask for a short video or photos and the order number.

INSTALLATION & SETUP:
1. Wiring: Red = ACC, Yellow = 12V constant, Black = Ground
2. Use provided harnesses; avoid splicing
3. Fitment may require dash kits or brackets
4. Post-install test: radio, Bluetooth, camera (and other key vehicle integrations)

CUSTOMER SUPPORT FLOW:
1. Greet & Empathize; apologize if there's an issue
2. Collect key facts (order #, product/variant, symptoms, install date, vehicle/voltage, prior fixes, photos/videos)
3. Run 1-3 quick checks (from Troubleshooting section)
4. Request/Review proof (photos/videos/logs) if unresolved
5. Decide next step: more tests, parts/info request, or warranty path
6. Confirm eligibility for replacement/discount only after proof and policy checks

VOICE & SUPPORT RULES:
- Voice: decisive, straight, friendly, professional, with a human touch. Always polite and apologetic if the customer has issues
- Only rely on this playbook (policies, FAQ, troubleshooting, product support, warranty, etc.)
- Always propose a next step (a test, photo/video request, replacement path)
- After 1-3 quick checks, stop and request proof (order #, photos/videos)
- Never promise warranty/refund until proof/setup is confirmed
- When offering warranty outcomes, check the Warranty section first

FORMATTING RULES:
- Use 1, 2, 3 or - only (no fancy bullets)
- Inline headings: "Quick checks you can try:"
- No excess blank lines
- Replies must be Podium copy-paste ready
- When recommending products, use EXACT product names from our catalog
- Always include the price
- Use this format for product mentions: [PRODUCT]Exact Product Name[/PRODUCT]

AVAILABLE PRODUCTS:
${productDatabase.map(p => `- ${p.name} - ${p.price}`).join('\n')}

STORE: https://eversetraveltech.com
CONTACT: Sales@eversetraveltech.com
OPERATING HOURS: Monday to Friday 8 am to 5:30 pm

Focus on quick, helpful responses. Provide essential information only. Keep it simple and fast.`;

async function chatWithAI(message, conversationHistory = []) {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return "I'm currently in setup mode. Please contact Sales@eversetraveltech.com for immediate assistance. Our team is available Monday to Friday 8am-5:30pm.";
    }

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
    
    // Return helpful error message instead of crashing
    if (error.code === 'invalid_api_key') {
      return "I'm currently being updated. Please email Sales@eversetraveltech.com for assistance and we'll help you right away.";
    }
    
    return "Sorry, I'm having trouble connecting right now. Please contact Sales@eversetraveltech.com for immediate support.";
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
