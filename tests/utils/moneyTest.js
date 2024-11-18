import { formatCurrency } from '../../scripts/utils/money.js';

//this ones are unit tests
//describe() creates a test-suite
describe('Test suite: formatCurrency', () => {
    //it() creates a test
    it('Converts cents into dollars', () =>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('Works with 0', () =>{
        //expect give us a object and this object has a method called toEqual
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('Rounds up to the nearest cent', () =>{
        //expect give us a object and this object has a method called toEqual
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });





});