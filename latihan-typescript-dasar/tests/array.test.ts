import * as async_hooks from "async_hooks";

describe('Array', () => {
    it('should array', () => {
        const names = ['aant', 'sultan', 'rahmanya'];
        const values = [100,200];

        console.info(names);
        console.info(values);
    });

    it('should only array', () => {
        const hobbies: ReadonlyArray<string> = ["membaca", "menulis"];
        console.info(hobbies);
        console.info(hobbies[0]);
        console.info(hobbies[1]);

        // hobbies[0] = 'main'; // error, karena data ReadonlyArray hanya bisa membaca
    });

    it('should tuple', () => {
        const person : readonly [string, string, number] = ["aant", "sultan", 20];
        console.info(person);
        console.info(person[0]);
        console.info(person[1]);
        console.info(person[2]);

        // person[0] = 'ganti' // error, karena data readonly hanya dapat dibaca
    });
});