// Everse Product Database - Exact product handles and titles
const EVENSE_PRODUCTS = {
    // Nexus Series
    'nexus-10-universal-head-unit': {
        title: 'Nexus 10.1" Universal Head Unit',
        handle: 'nexus-10-universal-head-unit',
        price: '$1,199.00',
        series: 'Nexus'
    },
    'nexus-rs-10-universal-head-unit': {
        title: 'Nexus RS 10.1" Universal Head Unit',
        handle: 'nexus-rs-10-universal-head-unit',
        price: '$1,499.00',
        series: 'Nexus'
    },
    'nexus-pro-13-universal-head-unit': {
        title: 'Nexus Pro 13.3" - Universal Head Unit',
        handle: 'nexus-pro-13-universal-head-unit',
        price: '$1,799.00',
        series: 'Nexus'
    },
    'nexus-pro-rs-13-universal-head-unit': {
        title: 'Nexus Pro RS 13.3" - Universal Head Unit',
        handle: 'nexus-pro-rs-13-universal-head-unit',
        price: '$1,899.00',
        series: 'Nexus'
    },

    // Elite Series
    'nissan-patrol-y61-2004-2015-black-plug-play-elite-head-unit': {
        title: 'Nissan Patrol Y61 2004 - 2015 (Black) Plug & Play Elite Head Unit',
        handle: 'nissan-patrol-y61-2004-2015-black-plug-play-elite-head-unit',
        price: '$899.00',
        series: 'Elite'
    },
    'nissan-patrol-y61-2004-2015-silver-plug-play-elite-head-unit': {
        title: 'Nissan Patrol Y61 2004 - 2015 (Silver) Plug & Play Elite Head Unit',
        handle: 'nissan-patrol-y61-2004-2015-silver-plug-play-elite-head-unit',
        price: '$899.00',
        series: 'Elite'
    },
    'toyota-hilux-n70-2008-2014-plug-play-elite-head-unit': {
        title: 'Toyota Hilux N70 2008 - 2014 Plug & Play Elite Head Unit',
        handle: 'toyota-hilux-n70-2008-2014-plug-play-elite-head-unit',
        price: '$899.00',
        series: 'Elite'
    },
    'toyota-hilux-n70-2005-2014-plug-play-elite-head-unit': {
        title: 'Toyota Hilux N70 2005 - 2014 Plug & Play Elite Head Unit',
        handle: 'toyota-hilux-n70-2005-2014-plug-play-elite-head-unit',
        price: '$899.00',
        series: 'Elite'
    },

    // Accessories & Cameras
    'nexus-reverse-camera': {
        title: 'Nexus Reverse Camera',
        handle: 'nexus-reverse-camera',
        price: '$89.00',
        series: 'Accessories'
    },
    'toyota-iso-adaptor': {
        title: 'Toyota ISO Adaptor',
        handle: 'toyota-iso-adaptor',
        price: '$59.00',
        series: 'Accessories'
    },
    'bluetooth-obd2-reader': {
        title: 'Bluetooth OBD2 reader',
        handle: 'bluetooth-obd2-reader',
        price: '$129.00',
        series: 'Accessories'
    },
    's4-gu-patrol-d22-navara-iso-adaptor': {
        title: 'S4 GU Patrol/D22 Navara ISO Adaptor',
        handle: 's4-gu-patrol-d22-navara-iso-adaptor',
        price: '$59.00',
        series: 'Accessories'
    },
    'tyre-pressure-monitoring-system-tpms': {
        title: 'Tyre Pressure Monitoring System (TPMS)',
        handle: 'tyre-pressure-monitoring-system-tpms',
        price: '$119.00',
        series: 'Accessories'
    },
    'hd-dash-camera': {
        title: 'HD Dash Camera',
        handle: 'hd-dash-camera',
        price: '$129.00',
        series: 'Cameras'
    },
    'two-tone-strip-light': {
        title: 'Two Tone™ Strip Light',
        handle: 'two-tone-strip-light',
        price: '$74.95',
        series: 'Lighting'
    },
    'car-trim-pull-kit-wire-snake': {
        title: 'Car Trim Pull Kit + Wire Snake',
        handle: 'car-trim-pull-kit-wire-snake',
        price: '$69.99',
        series: 'Accessories'
    },
    'dual-vison-monitor': {
        title: 'Dual Vison™ Monitor',
        handle: 'dual-vison-monitor',
        price: '$249.00',
        series: 'Cameras'
    }
};

// Product search and mapping functions
class ProductMapper {
    static findProductByTitle(productTitle) {
        const searchTitle = productTitle.toLowerCase().trim();
        
        // Exact match
        for (const [handle, product] of Object.entries(EVENSE_PRODUCTS)) {
            if (product.title.toLowerCase() === searchTitle) {
                return product;
            }
        }
        
        // Contains match
        for (const [handle, product] of Object.entries(EVENSE_PRODUCTS)) {
            if (searchTitle.includes(product.title.toLowerCase()) || 
                product.title.toLowerCase().includes(searchTitle)) {
                return product;
            }
        }
        
        // Keyword match
        const searchWords = searchTitle.split(/\s+/).filter(word => word.length > 2);
        let bestMatch = null;
        let bestScore = 0;
        
        for (const [handle, product] of Object.entries(EVENSE_PRODUCTS)) {
            const productTitleLower = product.title.toLowerCase();
            let score = 0;
            
            searchWords.forEach(word => {
                if (productTitleLower.includes(word)) {
                    score += 10;
                }
            });
            
            if (score > bestScore) {
                bestScore = score;
                bestMatch = product;
            }
        }
        
        return bestScore > 0 ? bestMatch : null;
    }
    
    static getAllProducts() {
        return Object.values(EVENSE_PRODUCTS);
    }
    
    static getProductsBySeries(series) {
        return Object.values(EVENSE_PRODUCTS).filter(product => 
            product.series.toLowerCase() === series.toLowerCase()
        );
    }
    
    static generateProductLink(product) {
        return `https://eversetraveltech.com/products/${product.handle}`;
    }
}

module.exports = { EVENSE_PRODUCTS, ProductMapper };