import {PackageRepository} from "../../domain/repository/packageRepository";
import {PackageStatus} from "../../domain/entity/packageStatus.enum";
import {Package} from "../../domain/entity/package";
import {DiscountRequestSaga} from "../../infrastructure/services/DiscountRequestSaga";

export class CreatePackageUseCase {
    constructor(readonly repository: PackageRepository, readonly discountRequestSaga: DiscountRequestSaga) {}

    async run(
        clientId: string,
        paymentId: string,
        orderId: string,
        origin: string,
        destiny: string,
        weight: number,
        details?: string
    ): Promise<Package | null> {
        try {
            //get discount
            const discount = await this.discountRequestSaga.sendDiscountRequest(clientId)
            console.log("el descuento es de : ", discount)
            return await this.repository.createPackage(clientId, paymentId, orderId, origin, destiny, weight, details);
        } catch (e) {
            console.error("Error in CreatePackageUseCase:", e);
            return null;
        }
    }
}