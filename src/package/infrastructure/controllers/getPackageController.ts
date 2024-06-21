import { Request, Response } from 'express';
import { GetPackageUseCase } from '../../application/useCase/getPackageUseCase';

export class GetPackageController {
  constructor(private getPackageUseCase: GetPackageUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const pkg = await this.getPackageUseCase.execute(id);
      return res.status(200).send({
        status:"Success",
        data:pkg,
        message:"package get success"
      });
    } catch (err) {
      const error = err as Error;
      return res.status(404).json({ message: error.message || 'Package not found' });
    }
  }
}