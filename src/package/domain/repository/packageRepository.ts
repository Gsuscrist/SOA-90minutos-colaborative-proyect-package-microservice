
import { Package } from "../entity/package";
import { PackageStatus } from "../entity/packageStatus.enum";

export interface PackageRepository {
    delete(id: string): Promise<void>;

    createPackage(
        clientId: string,
        paymentId: string,
        orderId: string,
        origin: string,
        destiny: string,
        weight: number,

        details?: string
    ): Promise<Package | null>;

    findById(id: string): Promise<Package | null>;
    findAll(): Promise<Package[]>;

    updatePackage(
        id: string,
        origin: string,
        destiny: string,
        weight: number,
        details?: string
    ): Promise<Package | null>;

    updateStatus(id: string, status: PackageStatus): Promise<Package | null | any>;


}
