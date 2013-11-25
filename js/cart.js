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

    $('.empty').click(function(){
        cart.items = [];
        renderCart(cart, $('.cart-container'));
    });//emptyCart()

    $('.remove-one').click(function(){
        var iToRemove = this.getAttribute('data-index');
        cart.items.splice(iToRemove, 1);
        renderCart(cart, $('.cart-container'));
    });

    $('.place-order').click(function(){
        if(total < 20) {
            alert("Please order a minumum of $20");
        }
        else {
            $('.order-modal').modal();
        }
    });

    $('.submit-order').click(function(){
        cart.name = $('.first-name').val();
        cart.address1 = $('.addr-1').val();
        cart.zip = $('.zip').val();
        cart.phone = $('.phone').val();
        postCart(cart, $('.cart-form'));
    });

}); //doc ready

// renderCart()
// renders the current cart information to the screen
// parameters are:
//  - cart (object) reference to the cart model
//  - container (jQuery object) reference to the container <div>
//
function renderCart(cart, container) {
    var i, item, removeBtn, clonedTemp;
    var subtotal = 0;
    
    //empty the container of whatever is there currently
    container.empty();

    //for each item in the cart...
    for (i = 0; i < cart.items.length; i++) {
        item = cart.items[i];

        clonedTemp = $('.cart-template').clone();
        removeBtn = $('.remove-one').clone();
        removeBtn.attr('data-index', i);
        clonedTemp.find('.cart-item').html(item.name + ' $' + item.price);
        //i dont know why, but i need to remove cart-tamplate class even though there is no class
        //if not then the items in cart show up multiple times
        clonedTemp.removeClass('cart-template');
        removeBtn.removeClass('remove-one');
        container.append(removeBtn);
        container.append(clonedTemp);
        subtotal += parseFloat(item.price);
    } //for each cart item


    //TODO: code to render sub-total price of the cart
    //the tax amount (see instructions), 
    //and the grand total
    var tax;
    tax = (subtotal * 0.095).toFixed(2);
    total = (subtotal * 1.095).toFixed(2);
    $('.tax').html("$" + tax);
    $('.subtotal').html("$" + subtotal);
    $('.total-price').html("$" + total);

} //renderCart()

// postCart()
// posts the cart model to the server using
// the supplied HTML form
// parameters are:
//  - cart (object) reference to the cart model
//  - cartForm (jQuery object) reference to the HTML form
//
function postCart(cart, cartForm) {
    //find the input in the form that has the name of 'cart'    
    //and set it's value to a JSON representation of the cart model
    cartForm.find('input[name="cart"]').val(JSON.stringify(cart));
    alert(cart);
    //submit the form--this will navigate to an order confirmation page
    cartForm.submit();
    window.location = 'http://www.google.com';
} //postCart()