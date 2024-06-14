import {PackageRepository} from "../../domain/repository/packageRepository";
import {PackageStatus} from "../../domain/entity/packageStatus.enum";
import {Package} from "../../domain/entity/package";

export class CreatePackageUseCase {

    constructor(readonly repository:PackageRepository) {
    }

    async run(
        clientId: string,
        paymentId: string,
        orderId: string,
        origin: string,
        destiny: string,
        weight: number,
        details?: string,
    ):Promise<Package | null> {
        try {
            return this.repository.createPackage(clientId,paymentId,orderId,origin,destiny,weight,details)
        }catch (e){
            return null
        }
    }

}