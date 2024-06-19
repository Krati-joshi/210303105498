const express = require('express');
const router = express.Router();
const axios = require('axios'); 
const API_URL = 'http://example.com/api/products';


async function fetchProducts(categoryName, n, page, sort_by, sort_order) {
    try {
       
        const response = await axios.get(API_URL, {
            params: {
                category: categoryName,
                limit: n,
                page: page,
                sort_by: sort_by,
                sort_order: sort_order
            }
        });

        return response.data; 
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; 
    }
}


router.get('/:categoryName/products', async (req, res) => {
    const { categoryName } = req.params;
    const { n, page, sort_by, sort_order } = req.query;

    try {
        
        const products = await fetchProducts(categoryName, n, page, sort_by, sort_order);

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
