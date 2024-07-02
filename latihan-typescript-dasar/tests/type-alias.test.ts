import {Category, Product} from "../src/type-alias";

describe('Type Alias', () => {
    it('should support in typscript', () => {
        const category: Category = {
            id:1,
            name:"Handphone"
        }

        const product: Product = {
            id:"1",
            name:"Samsung 2FP",
            price: 20000000,
            category: category
        }

        console.info(category);
        console.info(product);
    });
});