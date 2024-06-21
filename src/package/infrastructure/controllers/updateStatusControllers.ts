import { Request, Response } from 'express';
import { UpdateStatusUseCase } from '../../application/useCase/updateStatusUseCase';
import { PackageStatus } from '../../domain/entity/packageStatus.enum';

export class UpdateStatusController {
    constructor(private readonly useCase: UpdateStatusUseCase) {}

    async run(req: Request, res: Response): Promise<any> {
        try {
            const { id, status } = req.body as { id: string, status: string };

            // Convert string to PackageStatus
            const statusEnum: PackageStatus = PackageStatus[status as keyof typeof PackageStatus];
            if (!statusEnum) {
                console.error('Invalid status:', status);
                return res.status(400).send({
                    status: 'Error',
                    message: 'Invalid package status',
                });
            }
            console.log('AAAAAAA',statusEnum)
            const updatedPackage = await this.useCase.run(id, statusEnum);

            if (updatedPackage) {
                res.status(200).send({
                    status: 'Success',
                    data: updatedPackage,
                    message: 'Package status update succeeded',
                });
            } else {
                res.status(417).send({
                    status: 'Error',
                    data: [],
                    message: 'Package status update failed',
                });
            }
        } catch (error) {
            console.error('Error in UpdateStatusController:', error);
            res.status(500).send({
                status: 'Error',
                message: 'Internal Server Error',
            });
        }
    }
}
