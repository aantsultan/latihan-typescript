import {AddressTest, ContactTest, UserTest} from "./test-util";
import supertest from "supertest";
import {web} from "../src/application/web";
import {logger} from "../src/application/logging";

describe('POST /api/contacts/:contactId/addresses', () => {

    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to create address', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                contact_id: contact.id,
                street: "test",
                city: "test",
                province: "test",
                country: "test",
                postal_code: "1111"
            })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("test");
        expect(response.body.data.city).toBe("test");
        expect(response.body.data.province).toBe("test");
        expect(response.body.data.country).toBe("test");
        expect(response.body.data.postal_code).toBe("1111");
    });

    it('should be reject if data invalid', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                contact_id: contact.id,
                street: "sa",
                city: "sa",
                province: "sa",
                country: "sa",
                postal_code: "1111111111111111111111111111111111111111"
            })

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

describe('GET /api/contacts/:idContact/addresses/:idAddress', () => {

    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to get address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.create(contact);
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(address.id);
        expect(response.body.data.street).toBe(address.street);
        expect(response.body.data.city).toBe(address.city);
        expect(response.body.data.province).toBe(address.province);
        expect(response.body.data.country).toBe(address.country);
        expect(response.body.data.postal_code).toBe(address.postal_code);
    });

    it('should be reject to get address if address id is not found ', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.create(contact);
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

describe('PUT /api/contacts/:idContact/addresses/:idAddress', () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to update address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.create(contact);
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                id: address.id,
                contact_id: contact.id,
                street: "street Baru",
                city: "city BARU",
                country: address.country,
                postal_code: address.postal_code
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.street).toBe("street Baru");
        expect(response.body.data.city).toBe("city BARU");
        expect(response.body.data.province).toBe(address.province);
    });

    it('should be reject to update address if data is invalid', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.create(contact);
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                id: address.id,
                contact_id: contact.id,
                street: "",
                city: "",
                province: "",
                country: address.country,
                postal_code: address.postal_code
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

describe('DELETE /api/contacts/:idContact/addresses/:idAddress', () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to remove address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.create(contact);
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
    });

    it('should be reject to remove address if data is invalid', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.create(contact);
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

describe('GET /api/contacts/:idContact/addresses', () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to get addresses', async () => {
        const contact = await ContactTest.get();
        await AddressTest.create(contact);
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
    });

    it('should be reject to get addresses if contact is not valid', async () => {
        const contact = await ContactTest.get();
        await AddressTest.create(contact);
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}/addresses`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});