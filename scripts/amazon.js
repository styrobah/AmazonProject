//this is a module. Modules = better way to organize our code 
import { cart, addtoCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from '../scripts/utils/money.js';
//

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${formatCurrency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
                <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `;
});

function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) =>{
        cartQuantity += cartItem.quantity;
    })
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

document.querySelector('.js-products-grid').innerHTML = productsHTML;
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click', () => {
        //to add the product to the cart it was needed to create a data attribute on the html to be accessible when clicking on a button
        const productId = button.dataset.productId;
        addtoCart(productId);
        updateCartQuantity();
    });
});


//The benefits of Generating an HTML is that if we want to have new products, you dont need to be always writing HTML to every product. you just need to add the data to an array.


//The main idea of JavaScript is:
// 1) Save the data
// 2) Generate the HTML
// 3) Make it interactive