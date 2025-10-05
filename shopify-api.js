const axios = require('axios');

// Shopify configuration
const SHOPIFY_CONFIG = {
  storeUrl: process.env.SHOPIFY_STORE_URL,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  apiVersion: '2024-01'
};

// Get ALL products with complete information
async function getProducts() {
  try {
    const url = `https://${SHOPIFY_CONFIG.storeUrl}/admin/api/${SHOPIFY_CONFIG.apiVersion}/products.json?limit=10&fields=id,title,handle,variants`;
    
    const response = await axios.get(url, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_CONFIG.accessToken,
        'Content-Type': 'application/json'
      }
    });

    const products = response.data.products || [];
    console.log(`✅ Fetched ${products.length} products from Shopify`);
    
    return products;

  } catch (error) {
    console.error('❌ Error fetching products from Shopify:', error.response?.data || error.message);
    throw new Error('Failed to fetch products from Shopify');
  }
}

// Search products
async function searchProducts(query) {
  try {
    const url = `https://${SHOPIFY_CONFIG.storeUrl}/admin/api/${SHOPIFY_CONFIG.apiVersion}/products.json?limit=10&fields=id,title,handle,variants`;
    
    const response = await axios.get(url, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_CONFIG.accessToken,
        'Content-Type': 'application/json'
      }
    });

    const allProducts = response.data.products || [];
    const searchQuery = query.toLowerCase();
    
    const relevantProducts = allProducts.filter(product => {
      const title = product.title?.toLowerCase() || '';
      return title.includes(searchQuery);
    });
    
    return relevantProducts;

  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Failed to search products');
  }
}

module.exports = { getProducts, searchProducts };
