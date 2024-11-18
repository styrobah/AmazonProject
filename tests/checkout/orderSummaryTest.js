import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {cart,loadFromStorage} from '../../data/cart.js';


//both of the tests are integration tests = test many units/pieces of code working together

describe('Test suite: renderOrderSummary', () => {

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    //this is called a BeforeEach Hook, it will run this function before each of our test
    beforeEach(() => {
        spyOn(localStorage,'setItem');

        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;

        spyOn(localStorage,'getItem').and.callFake(() => {
            //localStorage on return strings that's why you use stringify
            return JSON.stringify([{
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId: '1',
                }, {
                    productId: productId2,
                    quantity: 1,
                    deliveryOptionId: '2'
                }]);
        });
        loadFromStorage();

        renderOrderSummary();

    });

    afterEach(() => {
        //this is how you check if the page is rendered ok 
        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('Displays the cart', () => {
        expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball');
        expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual('$10.90');
        expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('$20.95');

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');
    });


    it('Removes a product', () => {

        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball');
        expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('$20.95');
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(1);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    });

});