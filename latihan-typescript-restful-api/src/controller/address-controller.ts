import {UserRequest} from "../type/user-request";
import {NextFunction, Response} from "express";
import {CreateAddressRequest, UpdateAddressRequest} from "../model/address-model";
import {AddressService} from "../service/address-service";

export class AddressController {

    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateAddressRequest = req.body as CreateAddressRequest;
            const response = await AddressService.create(req.user!, request);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = Number(req.params.contactId);
            const addressId = Number(req.params.addressId);
            const response = await AddressService.get(req.user!, contactId, addressId);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = Number(req.params.contactId);
            const addressId = Number(req.params.addressId);
            const updateRequest: UpdateAddressRequest = req.body as UpdateAddressRequest;
            const response = await AddressService.update(req.user!, contactId, addressId, updateRequest);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = Number(req.params.contactId);
            const addressId = Number(req.params.addressId);
            await AddressService.remove(req.user!, contactId, addressId);
            res.status(200).json({
                data: "OK"
            });
        } catch (e) {
            next(e);
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = Number(req.params.contactId);
            const response = await AddressService.list(req.user!, contactId);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}