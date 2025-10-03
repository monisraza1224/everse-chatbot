const express = require('express');
const axios = require('axios');
const router = express.Router();

// Shopify configuration
const SHOPIFY_CONFIG = {
  storeUrl: process.env.SHOPIFY_STORE_URL,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  apiVersion: '2024-01'
};

// Get ALL products with complete information including pricing
router.get('/products', async (req, res) => {
  try {
    let allProducts = [];
    let nextPage = null;
    let page = 1;

    do {
      let url = `https://${SHOPIFY_CONFIG.storeUrl}/admin/api/${SHOPIFY_CONFIG.apiVersion}/products.json?limit=250&fields=id,title,handle,product_type,vendor,images,variants,body_html`;
      
      if (nextPage) {
        url = nextPage;
      }

      const response = await axios.get(url, {
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_CONFIG.accessToken,
          'Content-Type': 'application/json'
        }
      });

      const products = response.data.products || [];
      allProducts = allProducts.concat(products);
      
      // Check for next page
      const linkHeader = response.headers.link;
      nextPage = null;
      
      if (linkHeader && linkHeader.includes('rel="next"')) {
        const nextLinkMatch = linkHeader.match(/<([^>]+)>; rel="next"/);
        if (nextLinkMatch) {
          nextPage = nextLinkMatch[1];
        }
      }
      
      console.log(`📄 Fetched page ${page}: ${products.length} products`);
      page++;
      
      // Safety limit
      if (page > 10) break;
      
    } while (nextPage);

    console.log(`✅ Total products fetched: ${allProducts.length}`);
    console.log(`💰 Sample product pricing:`, allProducts.slice(0, 3).map(p => 
      `${p.title}: $${p.variants?.[0]?.price || 'N/A'}`
    ));
    
    res.json({
      products: allProducts,
      total: allProducts.length
    });

  } catch (error) {
    console.error('❌ Error fetching products:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      details: error.response?.data || error.message
    });
  }
});

// Get product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const response = await axios.get(
      `https://${SHOPIFY_CONFIG.storeUrl}/admin/api/${SHOPIFY_CONFIG.apiVersion}/products/${req.params.id}.json`,
      {
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_CONFIG.accessToken
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Search products (simple search through all products)
router.get('/products/search/:query', async (req, res) => {
  try {
    // Get all products first
    const allResponse = await axios.get(`/api/shopify/products`);
    const allProducts = allResponse.data.products || [];
    
    const searchQuery = req.params.query.toLowerCase();
    
    const relevantProducts = allProducts.filter(product => {
      const title = product.title?.toLowerCase() || '';
      const handle = product.handle?.toLowerCase() || '';
      const productType = product.product_type?.toLowerCase() || '';
      
      return title.includes(searchQuery) || 
             handle.includes(searchQuery) ||
             productType.includes(searchQuery) ||
             searchQuery.includes(title);
    });
    
    res.json({ 
      products: relevantProducts.slice(0, 10),
      total: relevantProducts.length
    });
    
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Failed to search products' });
  }
});

module.exports = router;