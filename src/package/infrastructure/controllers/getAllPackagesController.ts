import { Request, Response } from 'express';
import { GetAllPackagesUseCase } from '../../application/useCase/getAllPackageUseCase';

export class GetAllPackagesController {
  constructor(private getAllPackagesUseCase: GetAllPackagesUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const packages = await this.getAllPackagesUseCase.execute();
      return res.status(200).json(packages);
    } catch (err) {
        const error = err as Error;
        return res.status(404).json({ message: error.message || 'Unexpected error.' });
    }
  }
}