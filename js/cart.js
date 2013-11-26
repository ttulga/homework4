//document ready function
var total = 0;

$(function(){

    //create a cart model as a simple object with
    //the properties we eventually need to post to
    //the server
    var cart = {
        name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data

    //click event handler for all buttons with the
    //style class 'add-to-cart'
    $('.add-to-cart').click(function(){
        //use the attributes on the button to construct
        //a new cart item object that we can add to the
        //cart's items array
        var newCartItem = {
            type: this.getAttribute('data-type'),
            name: this.getAttribute('data-name'),
            size: this.getAttribute('data-size'),
            price: this.getAttribute('data-price')
        };

        //push the new item on to the items array
        cart.items.push(newCartItem);
    
        //render the cart's contents to the element
        //we're using to contain the cart information
        //note that you would need a <div> or some
        //other grouping element on the page that has a
        //style class of 'cart-container'
        renderCart(cart, $('.cart-container'));
    });

    // when clear my order is clicked, the cart items are set to [] which removes everything
    $('.empty').click(function(){
        cart.items = [];
        renderCart(cart, $('.cart-container'));
    });//emptyCart()

    // when the place order button is clicked, it checks to see if cart has minimum of $20
    // then shows a modal where you fill in information and submit to a confirmation page
    $('.place-order').click(function(){
        if(total < 20) {
            alert("Please order a minumum of $20");
        }
        else {
            $('.order-modal').modal();
        }
    });

    // this is the submit button on the modal. gets the input values and checks to see if all the required information 
    // is filled out then submits to the server.
    $('.submit').click(function(){
    	var input = $('.modal-body');

        cart.name = input.find('input[name="first-name"]').val() + " " + input.find('input[name="last-name"]').val();
        cart.address1 = input.find('input[name="addr-1"]').val();
        cart.zip = input.find('input[name="zip"]').val();
        cart.phone = input.find('input[name="phone"]').val();


        if (cart.name.length > 0 && cart.address1.length > 0 && cart.zip.length > 0 && cart.phone.length > 0) {        	
            $('#submit-form').find('input[name="cart"]').val(JSON.stringify(cart));
        	$('#submit-form').submit();
        }
        else {
            // i could not get the required attribute to display so i used an alert in case all the required
            // fields were not submitted
            alert('You have not filled in all the required fields');
        }
    });
}); //doc ready

// renderCart()
// renders the current cart information to the screen
// parameters are:
//  - cart (object) reference to the cart model
//  - container (jQuery object) reference to the container <div>
//
function renderCart(cart, container) {
    var i, item, clonedTemp;
    var subtotal = 0;
    
    //empty the container of whatever is there currently
    container.empty();

    //for each item in the cart...
    for (i = 0; i < cart.items.length; i++) {
        item = cart.items[i];

        clonedTemp = $('.cart-template').clone();
        clonedTemp.find('.cart-item').html(item.name + ' $' + item.price);
        // the button to remove items gets an attribute of the index
        clonedTemp.find('.remove-one').attr('data-index', i);
        
        // i dont know why, but i need to remove cart-tamplate class even though there is no class
        // if not then the items in cart show up multiple times
        clonedTemp.removeClass('cart-template');
        container.append(clonedTemp);
        subtotal += parseInt(item.price);
    } //for each cart item


    // renders the  sub-total price of the cart
    // the tax amount 
    // and the grand total
    var tax;
    tax = (subtotal * 0.095).toFixed(2);
    total = (subtotal * 1.095).toFixed(2);
    $('.tax').html("$" + tax);
    $('.subtotal').html("$" + subtotal);
    $('.total-price').html("$" + total);

    //if the remove item button is clicked it gets the attribute given and removes it
    $('.remove-one').click(function(){
        var idxToRemove = this.getAttribute('data-index');
        cart.items.splice(idxToRemove, 1);
        renderCart(cart, $('.cart-container'));
    }); 
} //renderCart()