import {Package} from "../entity/package";
import {PackageStatus} from "../entity/packageStatus.enum";

export interface PackageRepository{
    createPackage(
        clientId: string,
        paymentId: string,
        orderId: string,
        origin: string,
        destiny: string,
        weight: number,
        distance: number,
        cost: number,
        status: PackageStatus,
        creationDate: Date,
        deliveryDate: Date,
        details?: string,
    ):Promise<Package>;
}