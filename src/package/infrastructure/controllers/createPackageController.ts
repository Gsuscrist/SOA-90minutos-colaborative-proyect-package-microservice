import {Request, Response} from 'express'
import {CreatePackageUseCase} from "../../application/useCase/createPackageUseCase";
import {Package} from "../../domain/entity/package";
import {PackageStatus} from "../../domain/entity/packageStatus.enum";

export class CreatePackageController {

    constructor(readonly useCase:CreatePackageUseCase) {
    }

    async run(req: Request, res: Response) {
        try {
            let {clientId, paymentId, orderId, origin, destiny, weight, distance,
                cost , status,creationDate ,deliveryDate, details} = req.body
            const packages = await this.useCase.run(clientId,paymentId,orderId,origin,destiny,weight,distance,cost,status,creationDate,deliveryDate,details)
            if (packages) {
                return res.status(201).send({
                    status: "Success",
                    data: packages,
                    message: "package creation succeed"
                })
            }else{
                res.status(417).send({
                    status: "Error",
                    data: [],
                    message: "package creation failed"
                })
            }

        }catch (e){
            console.error("error:\n",e);
            res.status(500).send({
                status:"Error",
                error: e
            })
        }
    }
}