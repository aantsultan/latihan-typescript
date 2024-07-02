import {Address, User} from "@prisma/client";
import {AddressResponse, CreateAddressRequest, toAddressResponse, UpdateAddressRequest} from "../model/address-model";
import {Validation} from "../validation/validation";
import {AddressValidation} from "../validation/address-validation";
import {ContactService} from "./contact-service";
import {prismaClient} from "../application/database";
import {ResponseError} from "../error/response-error";
import {Pageable} from "../model/page";

export class AddressService {
    static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
        const createRequest = Validation.validate(AddressValidation.CREATE, request);
        await ContactService.checkContactMustExist(user.username, request.contact_id);

        const address = await prismaClient.address.create({
            data: createRequest
        });
        return toAddressResponse(address);
    }

    static async get(user: User, contactId: number, addressId: number): Promise<AddressResponse> {
        await ContactService.checkContactMustExist(user.username, contactId);

        const address = await prismaClient.address.findUnique({
            where: {
                id: addressId,
                contact_id: contactId
            }
        });

        if (!address) {
            throw new ResponseError(404, "Address is not found");
        }

        return toAddressResponse(address);
    }

    static async update(user: User, contactId: number, addressId: number, request: UpdateAddressRequest): Promise<AddressResponse> {
        const updateRequest: UpdateAddressRequest = Validation.validate(AddressValidation.UPDATE, request);

        await ContactService.checkContactMustExist(user.username, contactId);
        await this.checkAddressMustExist(contactId, addressId);

        const address = await prismaClient.address.update({
            where: {
                id: addressId
            },
            data: updateRequest
        });

        return toAddressResponse(address);
    }

    static async remove(user: User, contactId: number, addressId: number) {
        await ContactService.checkContactMustExist(user.username, contactId);
        await this.checkAddressMustExist(contactId, addressId);

        await prismaClient.address.delete({
            where: {
                id: addressId
            }
        });
    }

    static async list(user: User, contactId: number): Promise<Pageable<AddressResponse>> {
        await ContactService.checkContactMustExist(user.username, contactId);

        const addresses = await prismaClient.address.findMany({
            where: {
                contact_id: contactId
            }
        })

        return {
            data: addresses.map((address) => toAddressResponse(address))
        };
    }

    static async checkAddressMustExist(contactId: number, addressId: number): Promise<Address> {
        const address = await prismaClient.address.findUnique({
            where: {
                id: addressId,
                contact_id: contactId
            }
        });

        if (!address) {
            throw new ResponseError(404, "Address is not found");
        }

        return address;
    }

}