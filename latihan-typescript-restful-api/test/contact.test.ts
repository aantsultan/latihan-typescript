import {ContactTest, UserTest} from "./test-util";
import supertest from "supertest";
import {web} from "../src/application/web";
import {logger} from "../src/application/logging";
import {it} from "@jest/globals";

describe('POST /api/contacts', () => {
    beforeEach(async () => {
        await UserTest.create();
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should create new contact', async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "aant",
                last_name: "sultan",
                email: "sultan@mail.com",
                phone: "11111111"
            })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe("aant");
        expect(response.body.data.last_name).toBe("sultan");
        expect(response.body.data.email).toBe("sultan@mail.com");
        expect(response.body.data.phone).toBe("11111111");
    });

    it('should reject create new contact if data is invalid', async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "",
                email: "aaaa",
                phone: "11111111111111111111111111111111111111111111111111111111"
            })

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
})

describe('GET /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able get contact', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe(contact.first_name);
        expect(response.body.data.last_name).toBe(contact.last_name);
        expect(response.body.data.phone).toBe(contact.phone);
        expect(response.body.data.email).toBe(contact.email);
    });

    it('should reject get contact if contact id is not found', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
})

describe('UPDATE /api/contacts/:id', () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to update contact', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "aant",
                last_name: "sultan edit",
                phone: "122222",
                email: "test@edit.com"
            })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(contact.id);
        expect(response.body.data.first_name).toBe("aant");
        expect(response.body.data.last_name).toBe("sultan edit");
        expect(response.body.data.phone).toBe("122222");
        expect(response.body.data.email).toBe("test@edit.com");
    });

    it('should reject update contact if request is invalid', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "",
                phone: "salah",
                email: ""
            })

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

describe('DELETE /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to remove contact', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
    });

    it('should reject remove contact if contact id is not found', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

describe('GET /api/contacts', () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to search contact', async () => {
        const response  = await supertest(web)
            .get("/api/contacts")
            .set("X-API-TOKEN", "test")

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact using name', async () => {
        const response  = await supertest(web)
            .get("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                name: "es"
            })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact using email', async () => {
        const response  = await supertest(web)
            .get("/api/contacts")
            .set("X-API-TOKEN", "test")
            .query({
                email: ".com"
            })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact using phone', async () => {
        const response  = await supertest(web)
            .get("/api/contacts")
            .set("X-API-TOKEN", "test")
            .query({
                phone: "1"
            })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact no result', async () => {
        const response  = await supertest(web)
            .get("/api/contacts")
            .set("X-API-TOKEN", "test")
            .query({
                name: "salah"
            })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(0);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact with paging', async () => {
        const response  = await supertest(web)
            .get("/api/contacts")
            .set("X-API-TOKEN", "test")
            .query({
                page : 2,
                size : 1
            })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(2);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(1);
    });
});