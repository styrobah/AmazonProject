export function formatCurrency(priceCents) {
    return (priceCents/100).toFixed(2);
}

//if we use this export default it means when you are importing the format currency, you don't need to use the {}. See example on checkout.js. But you can only use this, if you only have one thing, in this case one function
export default formatCurrency;