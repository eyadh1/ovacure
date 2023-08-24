//selecting DOM elements
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
// opzning the shopping cart
openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
});
//closing the shopping cart
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
});
//array pf products
let products = [
    {
        id: 1,
        name: 'Planner warrior',
        image: 'planner1.jpg',
        price: 50
    },
    {
        id: 2,
        name: 'Water bottle',
        image: 'water.jpg',
        price: 30
    },
    {
        id: 3,
        name: 'Tote bag warrior',
        image: 'tote-warrior.jpg',
        price: 40
    },
    {
        id: 4,
        name: 'T-shirt ovacure',
        image: 'tshirt.jpg',
        price: 70
    },
    {
        id: 5,
        name: 'Planner ovacure',
        image: 'planner2.jpg',
        price: 60
    },
    {
        id: 6,
        name: 'Tote bag ovacure',
        image: 'tote-ovacure.jpg',
        price: 40
    },
    {
        id: 1,
        name: 'planner ',
        image: 'planner3.jpg',
        price: 65
    },
    {
        id: 2,
        name: 'water bottle ovacure',
        image: 'white-reusable-water-bottle.jpg',
        price: 30
    },
    {
        id: 3,
        name: 'lunch box',
        image: 'lunch-box.png',
        price: 45
    },
    {
        id: 4,
        name: 'mug warrior',
        image: 'muggwarrior.jpg',
        price: 25
    },
    {
        id: 5,
        name: 'phone case warrior',
        image: 'case-warrior.jpg',
        price: 25
    },
    {
        id: 6,
        name: 'mug ovacure' ,
        image: 'mugg.jpg',
        price: 15
    },
    {
        id: 4,
        name: 'mug  ',
        image: 'mugribbon.jpg',
        price: 15
    },
    {
        id: 5,
        name: 'Pin ',
        image: 'pin1.png',
        price: 2
    },
    {
        id: 6,
        name: 'pin  ',
        image: 'pin2.png',
        price: 2
    },
];
//array to store selected items
let listCards  = [];
//create a function for adding cards in html page using loop and if else statements
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="assests/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}DT</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
// create a function that will add the item into card array when clicked on button
initApp();
//create a function to remove an element from the cart
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
//Function to reload and update the cart
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
         // Updating the total price and quantity
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
             // Creating a new card item
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="assests/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()} DT</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
// Function to change the quantity of an item in the cart
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}