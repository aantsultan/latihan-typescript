describe('union type', () => {
    it('should union type', () => {
        let sample : string | number | boolean = 'Aant';
        console.info(sample);
        sample = 1;
        console.info(sample);
        sample = true;
        console.info(sample);
        
        // sample = [1,2] // error
    });

    it('should union process', () => {
        function process (value :string | number | boolean){
            if(typeof value === "string"){
                return value.toUpperCase();
            } else if (typeof value === "number"){
                return value + 2;
            } else {
                return !value;
            }
        }

        expect(process('aant')).toBe('AANT');
        expect(process(1)).toBe(3);
        expect(process(true)).toBe(false);
    });
});