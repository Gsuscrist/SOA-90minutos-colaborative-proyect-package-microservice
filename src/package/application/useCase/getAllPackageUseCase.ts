import {PackageRepository} from "../../domain/repository/packageRepository";

export class GetAllPackagesUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute() {
    return await this.packageRepository.findAll();
  }
}