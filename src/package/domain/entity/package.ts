import {PackageStatus} from "./packageStatus.enum";

export class Package{
    constructor(
        readonly id: string,
        readonly clientId: string,
        readonly paymentId: string,
        readonly orderId: string,
        readonly origin: string,
        readonly destiny: string,
        readonly weight: number,
        readonly distance: number,
        readonly cost: number,
        readonly status: PackageStatus,
        readonly creationDate: Date,
        readonly deliveryDate: Date,
        readonly details?: string,
        readonly deletedAt?: Date | null
    ) {
    }
}