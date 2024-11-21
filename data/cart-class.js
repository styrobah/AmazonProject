
import { validDeliveryOption } from "./deliveryOptions.js";

//Class = oject generator
//In a class the structure should be:
//properties
//methods

class Cart {
    //this is how you add a property to a class, now every object we generate will have this property
    cartItems;

    //I put the hash in the localStorageKey to make it private
    #localStorageKey;
    //it's the same as
    //cartItems = undefined;
    //localStorageKey = undefined;


    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }


    #loadFromStorage() {
        //this give is the outer object, in this case is cart but I could be another one. Instead of having cart.cartItems
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
      
        if (!this.cartItems) {
          this.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
          }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
          }];
      }
    }

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;
        
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
            matchingItem = cartItem;
            }
        });
        
        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
            });
        }
        this.saveToStorage();
    }

    removeFromCart(productId) {
        const newCart = [];
        
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
            newCart.push(cartItem);
            }
        });
        
        this.cartItems = newCart;
        
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
      
        if (!matchingItem) {
          return;
        }
      
        if(!validDeliveryOption(deliveryOptionId)){
          return;
        }
        matchingItem.deliveryOptionId = deliveryOptionId;
      
        this.saveToStorage();
      }
}

//this is an instance from a class
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);


//this will check if this object was generated from the class Cart
console.log(businessCart instanceof Cart);