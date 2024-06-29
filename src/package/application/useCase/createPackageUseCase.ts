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
            let discount: number | undefined;
            while (discount === undefined) {
                discount = await this.discountRequestSaga.sendDiscountRequest(clientId);
            }
            console.log("El descuento es de: ", discount);

            return await this.repository.createPackage(clientId, paymentId, orderId, origin, destiny, weight, discount, details,);

        } catch (e) {
            console.error("Error in CreatePackageUseCase:", e);
            return null;
        }
    }
}