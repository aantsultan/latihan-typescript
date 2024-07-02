export type ID = string | number;

export type Category = {
    // id: string;
    id:ID;
    name: string;

}

export type Product = {
    // id: string;
    id:ID;
    name: string;
    price: number;
    category: Category;
}