import { PackageRepository } from '../../domain/repository/packageRepository';

export class DeletePackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute(id: string): Promise<void> {
    const packageExists = await this.packageRepository.findById(id);
    if (!packageExists) {
      throw new Error('Package not found');
    }
    await this.packageRepository.delete(id);
  }
}