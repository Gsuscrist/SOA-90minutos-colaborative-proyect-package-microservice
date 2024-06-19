import {PackageRepository} from "../../domain/repository/packageRepository";

export class GetPackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute(id: string) {
    const pkg = await this.packageRepository.findById(id);
    if (!pkg) {
      throw new Error('Package not found');
    }
    return pkg;
  }
}