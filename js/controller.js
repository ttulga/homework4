/* controller.js
    Controller for Shopping Cart page
*/

$(function(){
	var formatLabels = {
	    dvd: 'DVD',
	    bluray: 'Blu-Ray'
	};
      
    var cartModel = createCartModel();
	var cartView = createCartView({
	    model: cartModel,
	    template: $('.cart-item-template'),
	    container: $('.cart-items-container'),
	    totalPrice: $('.total-price')
	});

	var moviesModel = createMoviesModel({
	    url: 'http://www.dawgpizza.com/orders/menu.js'
	});

	var moviesView = createMoviesView({
	    model: moviesModel,
	    template: $('.movie-template'),
	    container: $('.movies-container')
	});

	//refresh to get movies from server
	moviesModel.refresh();

	//when the movies view triggers 'addToCart'
	//add a new item to the cart, using the supplied
	//movieID and format
	moviesView.on('addToCart', function(data){
	    var movie = moviesModel.getItem(data.movieID);
	    if (!movie)
	        throw 'Invalid movie ID "' + movieID + '"!'; 

	    cartModel.addItem({
	        id: movie.id,
	        title: pizzas.name,
	        format: data.format,
	        formatLabel: formatLabels[data.format],
	        price: movie.prices[data.format]
	    });
	}); //addToCart event

	$('.place-order').click(function(){
		$.ajax({
		    url: 'http://www.dawgpizza.com/orders/menu.js',
		    type: 'POST',
		    data: cartModel.toJSON(),
		    contentType: 'application/json',
		    success: function(responseData) {
		        //code to run after successful post
		        alert('Your movie(s) have been ordered!')
		    },
		    error: function(jqXHR, status, errorThrown) {
		        //error with post--alert user
		        alert(errorThrown || status);
		    }
		}); //ajax()
		//clears the cart after order is placed
		cartModel.setItems([]);
	});
}); //doc ready()

