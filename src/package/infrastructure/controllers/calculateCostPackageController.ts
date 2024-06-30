import {Request, Response} from 'express';
import {CalculateCostPackageUseCase} from "../../application/useCase/calculateCostPackageUseCase";


export class CalculateCostPackageController {
    constructor(readonly useCase:CalculateCostPackageUseCase) {
    }

    async run(req: Request, res: Response) {
        try {
            let {origin, destiny, weight} = req.body
            const data = await this.useCase.run(origin,destiny,weight)
            if (data) {
                return res.status(200).send({
                    status: 'Success',
                    data:data,
                    message:'Calculate cost succeeded'
                })
            }
        }catch (e){
            res.status(500).send({
                status:"error",
                error: e});
        }
    }
}