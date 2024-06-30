import { Package } from '../../package/domain/entity/package';
import { PackageStatus } from '../../package/domain/entity/packageStatus.enum';
import { PackageRepository } from '../../package/domain/repository/packageRepository';

export class MockPackageRepository implements PackageRepository {
    private packages: Package[] = [];

    async delete(id: string): Promise<void> {
        const index = this.packages.findIndex(pkg => pkg.id === id);
        if (index !== -1) {
            this.packages.splice(index, 1);
        } else {
            throw new Error('Package not found');
        }
    }

    async updatePackage(id: string, origin: string, destiny: string, weight: number, details?: string): Promise<Package | null> {
        const foundPackage = this.packages.find(pkg => pkg.id === id);
        if (foundPackage) {
            const updatedPackage = new Package(
                foundPackage.id,
                foundPackage.clientId,
                foundPackage.paymentId,
                foundPackage.orderId,
                origin,
                destiny,
                weight,
                foundPackage.distance,
                foundPackage.cost,
                foundPackage.status,
                foundPackage.creationDate,
                foundPackage.deliveryDate,
                details,
                foundPackage.deletedAt
            );
            this.packages[this.packages.indexOf(foundPackage)] = updatedPackage;
            return updatedPackage;
        }
        return null;
    }

    async updateStatus(id: string, status: PackageStatus): Promise<Package | null> {
        const foundPackage = this.packages.find(pkg => pkg.id === id);
        if (foundPackage) {
            const updatedPackage = new Package(
                foundPackage.id,
                foundPackage.clientId,
                foundPackage.paymentId,
                foundPackage.orderId,
                foundPackage.origin,
                foundPackage.destiny,
                foundPackage.weight,
                foundPackage.distance,
                foundPackage.cost,
                status,
                foundPackage.creationDate,
                foundPackage.deliveryDate,
                foundPackage.details,
                foundPackage.deletedAt
            );
            this.packages[this.packages.indexOf(foundPackage)] = updatedPackage;
            return updatedPackage;
        }
        return null;
    }

    async createPackage(
        clientId: string,
        paymentId: string,
        orderId: string,
        origin: string,
        destiny: string,
        weight: number,
        cost:number,
        details?: string
    ): Promise<Package> {
        const distance = this.calculateDistance(origin, destiny);
        const creationDate = new Date();
        const deliveryDate = new Date(creationDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 días después de la creación

        const newPackage = new Package(
            (this.packages.length + 1).toString(),
            clientId,
            paymentId,
            orderId,
            origin,
            destiny,
            weight,
            distance,
            weight * 3,
            PackageStatus.Created,
            creationDate,
            deliveryDate,
            details,
            null
        );
        this.packages.push(newPackage);
        return newPackage;
    }

    async findById(id: string): Promise<Package | null> {
        const foundPackage = this.packages.find(pkg => pkg.id === id);
        return foundPackage ? foundPackage : null;
    }

    async findAll(): Promise<Package[]> {
        return this.packages;
    }

    async getNextId(): Promise<number> {
        return this.packages.length + 1;
    }

    private calculateDistance(origin: string, destiny: string): number {
        return 50;
    }

    sendNotification(id: string): Promise<Package> {
        throw new Error("method dont implemented")
    }

    calculateCost(origin: string, destiny: string, weight: number): Promise<{ subtotal: number } | null> {
        throw new Error("method dont implemented")
    }
}
