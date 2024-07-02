import {prismaClient} from "../src/application/database";
import bcrypt from "bcrypt";
import {Address, Contact, User} from "@prisma/client";

export class UserTest {
    static async delete() {
        await prismaClient.user.deleteMany({
            // deleteMany, tidak mempermasalahkan data ada atau tidak
            where: {
                username: "test"
            }
        })
    }

    static async create() {
        await prismaClient.user.create({
            data: {
                username: "test",
                name: "test",
                password: await bcrypt.hash("test", 10),
                token: "test"
            }
        });
    }

    static async get(): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                username: "test"
            }
        })

        if (!user) {
            throw new Error("User is not found");
        }

        return user;
    }
}

export class ContactTest {
    static async deleteAll() {
        await prismaClient.contact.deleteMany({
            where: {
                username: "test"
            }
        })
    }

    static async create() {
        await prismaClient.contact.create({
            data: {
                first_name: "test",
                last_name: "test",
                email: "test@test.com",
                phone: "1111111",
                username: "test"
            }
        })
    }

    static async get(): Promise<Contact>{
        const contact = await prismaClient.contact.findFirst({
            where: {
                username:"test"
            }
        });

        if(!contact){
            throw new Error("Contact is not found");
        }

        return contact;
    }
}

export class AddressTest {
    static async deleteAll(){
        await prismaClient.address.deleteMany({})
    }

    static async create(contact: Contact) : Promise<Address>{
        return prismaClient.address.create({
            data: {
                contact_id: contact.id,
                street: "test",
                city: "test",
                province: "test",
                country: "test",
                postal_code: "1111"
            }
        });
    }
}