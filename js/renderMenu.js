$(function(){
    renderPizza(com.dawgpizza.menu);
    renderDrinks(com.dawgpizza.menu);
    renderDesserts(com.dawgpizza.menu);
}); // on doc ready 

function renderPizza(entry) {
    var i;
    var pizza;
    var template = $('.template-pizza');
    var clonedTemplate;
    var container = $('.container-pizza');
    for (i = 0; i < entry.pizzas.length; i++) {
        pizza = entry.pizzas[i];

        clonedTemplate = template.clone();
        clonedTemplate.find('.name').html(pizza.name);
        clonedTemplate.find('.description').html(pizza.description);

        clonedTemplate.find('.small').html("$" + pizza.prices[0]);
        // used attr to give the buttons what pizza is associated with it
        clonedTemplate.find('.small-btn').attr({
            'data-type': pizza.type,
            'data-name': pizza.name,
            'data-size': 'small',
            'data-price': pizza.prices[0]
        });
        clonedTemplate.find('.medium').html("$" + pizza.prices[1]);
        clonedTemplate.find('.medium-btn').attr({
            'data-type': pizza.type,
            'data-name': pizza.name,
            'data-size': 'medium',
            'data-price': pizza.prices[1]
        });
        clonedTemplate.find('.large').html("$" + pizza.prices[2]);
        clonedTemplate.find('.large-btn').attr({
            'data-type': pizza.type,
            'data-name': pizza.name,
            'data-size': 'large',
            'data-price': pizza.prices[2]
        });

        clonedTemplate.removeClass('template');
        container.append(clonedTemplate);
    } //for each pizza
}

function renderDrinks(entry) {
    var i;
    var drink;
    var template = $('.template-drinks');
    var container = $('.container-drinks');
    var clonedTemplate;
    for (i = 0; i < entry.drinks.length; i++) {
        drink = entry.drinks[i];

        clonedTemplate = template.clone();
        clonedTemplate.find('.name').html(drink.name);
        clonedTemplate.find('.prices').html("$" + drink.price);
        clonedTemplate.find('.drinks-btn').attr({
            'data-name': drink.name,
            'data-type': drink.type,
            'data-price': drink.price
        });
        clonedTemplate.removeClass('template');
        container.append(clonedTemplate);
    } //for each drink
}

function renderDesserts(entry) {
    var i;
    var dessert;
    var template = $('.template-desserts');
    var container = $('.container-desserts');
    var clonedTemplate;
    for (i = 0; i < entry.desserts.length; i++) {
        dessert = entry.desserts[i];

        clonedTemplate = template.clone();
        clonedTemplate.find('.name').html(dessert.name);
        clonedTemplate.find('.prices').html("$" + dessert.price);
        clonedTemplate.find('.desserts-btn').attr({
            'data-name': dessert.name,
            'data-type': dessert.type,
            'data-price': dessert.price
        });
        clonedTemplate.removeClass('template');
        container.append(clonedTemplate);
    } //for each dessert
}