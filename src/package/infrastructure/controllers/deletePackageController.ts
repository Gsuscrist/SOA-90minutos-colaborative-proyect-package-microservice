import { Request, Response } from 'express';
import { DeletePackageUseCase } from '../../application/useCase/deletePackageUseCase';

export class DeletePackageController {
  run(req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) {
      throw new Error('Method not implemented.');
  }
  constructor(private deletePackageUseCase: DeletePackageUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deletePackageUseCase.execute(id);
      return res.status(204).send(); // 204 No Content indica que la operaciÃ³n fue exitosa
    } catch (err) {
      const error = err as Error;
      return res.status(404).json({ message: error.message || 'Package not found' });
    }
  }
}