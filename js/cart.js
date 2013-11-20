/*
    createCartModel()

    Creates a model for the shopping cart. This uses the ListModel
    as the prototype, but adds a few specific methods.

    The config parameter can contain the following properties:
    - items (array of objects) initial items for the cart (optional)
*/

function createCartModel(config) {
	var model = createListModel(config);
	model.getTotalPrice = function() {
		var i;
		var totalPrice = 0;
		for (i = 0; i < this.items.length; i++) {
			totalPrice += this.items[i].price;
		}
		return totalPrice.toFixed(2);
	}; //get total prices

	model.toJSON = function() {
		return JSON.stringify(this.items);
	};

	return model;
} //createCartModel()