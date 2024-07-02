describe('Object Type', () => {
    it('should object in typescript', () => {
        const person : {id:string, name:string} = {
            id:'1',
            name:'sultan'
        }
        console.info(person);
        person.id = '2';
        person.name = 'aant';
        console.info(person);
    });
});