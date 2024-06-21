import { Request, Response } from 'express';
import { UpdatePackageUseCase } from '../../application/useCase/updatePackageUsecase';

export class UpdatePackageController {
    constructor(readonly useCase: UpdatePackageUseCase) {}

    async run(req: Request, res: Response): Promise<any> {
        try {
            const { id, origin, destiny, weight, details } = req.body as { id: string, origin: string, destiny: string, weight: number, details?: string };

            // Log the incoming request body for debugging purposes
            console.log("Incoming request:", { id, origin, destiny, weight, details });

            // Call the use case and await the result
            const updatedPackage = await this.useCase.run(id, origin, destiny, weight, details);

            // Send the appropriate response based on the result
            if (updatedPackage) {
                res.status(200).send({
                    status: 'Success',
                    data: updatedPackage,
                    message: 'Package update succeeded',
                });
            } else {
                res.status(417).send({
                    status: 'Error',
                    data: [],
                    message: 'Package update failed',
                });
            }
        } catch (error) {
            // Log the error for debugging purposes
            console.error('Error in UpdatePackageController:', error);

            // Send a generic error response
            res.status(500).send({
                status: 'Error',
                message: 'Internal Server Error',
            });
        }
    }
}
