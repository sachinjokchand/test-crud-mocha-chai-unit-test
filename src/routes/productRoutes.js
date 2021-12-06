const express = require('express');
const { createProduct, listProduct, updateProduct, deleteProduct, deleteAllProduct } = require('../controllers/product');
const router = express.Router();

router.post("/product/create", createProduct);
router.get("/product/list", listProduct);
router.put("/product/:id", updateProduct);
router.delete('/product/delete/:id', deleteProduct);
router.delete('/product/delete',deleteAllProduct);

module.exports = router;