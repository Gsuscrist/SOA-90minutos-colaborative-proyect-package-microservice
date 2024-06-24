import { Package } from "../../domain/entity/package";
import { PackageRepository } from "../../domain/repository/packageRepository";

export class UpdatePackageUseCase {
    constructor(readonly repository: PackageRepository) {}

    async run(
        id: string,
        origin: string,
        destiny: string,
        weight: number,
        details?: string
    ): Promise<Package | null> {
        try {
            const result = await this.repository.updatePackage(id, origin, destiny, weight, details);
            if (result && result) {
                return result;
            } else {
                console.error("Update failed:");
                return null;
            }
        } catch (e) {
            console.error("Error in UpdatePackageUseCase:", e);
            return null;
        }
    }
}
