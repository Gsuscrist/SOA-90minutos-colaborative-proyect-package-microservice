import {PackageRepository} from "../../domain/repository/packageRepository";
import {Package} from "../../domain/entity/package";

export class CreatePackageUseCase {
    constructor(readonly repository: PackageRepository) {

    }

    async run(
        clientId: string,
        paymentId: string,
        orderId: string,
        origin: string,
        destiny: string,
        weight: number,
        cost:number,
        details?: string
    ): Promise<Package | null> {
        try {
            return await this.repository.createPackage(clientId, paymentId, orderId, origin, destiny, weight, cost, details,);

        } catch (e) {
            console.error("Error in CreatePackageUseCase:", e);
            return null;
        }
    }
}