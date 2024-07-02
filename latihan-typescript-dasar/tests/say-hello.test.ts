import {sayHello} from "../src/say-hello";

describe('sayHello', function () {
    it('should return hello aant', function (){
        expect(sayHello('aant')).toBe('hello aant');
    })
})