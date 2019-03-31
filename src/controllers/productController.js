const productQueries = require("../db/queries.products.js");

module.exports = {

	index(req, res, next){
		productQueries.getAllProducts((err, products) => {
			if(err){
				res.redirect(500, "static/index");
			} else {
				res.render("products/index", {products});
			}
		})
	},
	new(req, res, next){
     res.render("products/new")	
    },

    create(req, res, next){
			 let newProduct= {
			  name: req.body.name,
				description:req.body.description,
				price:req.body.price,
				imageurl:req.body.imageurl,
				userId:req.user.id
			  };
			  productQueries.addProduct(newProduct, (err, product) => {
				if(err){
					console.log(err);
					res.redirect(500, "/products");
				} else {
					res.redirect(303,`/products/${product.id}`);
				}
			});
		},

	show(req, res, next){
			productQueries.getProduct(req.params.id, (err, product) => {
			  if(err || product == null){
				res.redirect(404, "/");
			  } else {
				res.render("products/show", {product});
			  }
			});
		  }
}
