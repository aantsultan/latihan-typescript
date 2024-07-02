describe('Tipe Any', () => {
    it('should tipe any', () => {
        const person : any = {
            id: 1,
            name: 'Aant',
            age: 20
        }

        person.age = 10;
        person.name = 'Sultan';

        console.info(person);
    });
});