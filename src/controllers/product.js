const Product = require('../models/product');

exports.createProduct = (req, res) => {
    Product.findOne({ productName: req.body.productName })
        .exec((error, product) => {
            if (product) return res.status(400).json({
                message: 'Product alreay exist.'
            });

            const {
                productName,
                price,
                description
            } = req.body;

            const _product = new Product({
                productName,
                price,
                description
            });

            _product.save((error, data) => {
                if (error) return res.status(400).json({
                    message: error
                })
                if (data) return res.status(200).json({
                    data: data
                })
            });

        });
};

exports.listProduct = (req, res) => {

    Product.find().exec(function (err, data) {
        if (err) { res.status(400).json(err); return; };
        res.status(200).json({
            data: data
        });
    });
};

exports.updateProduct = (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, (err, doc) => {
        if (err) return res.status(400).json({ error: err });
        return res.send('Succesfully saved.');
    })
};

exports.deleteProduct = (req, res) => {
    const id = req.params.id;
  
    Product.findByIdAndRemove(id,(err, doc) => {
        if (err) return res.status(400).json({ error: err });
        return res.send('Deleted successfully.');
    })
  };

exports.deleteAllProduct = (req, res) => {
    Product.deleteMany({}, (err, doc) => {
        if (err) return res.status(400).json({ error: err });
        return res.send('Deleted successfully.');
    })
};