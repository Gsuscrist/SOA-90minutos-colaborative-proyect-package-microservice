
import { PackageRepository } from '../../../src/package/domain/repository/packageRepository';
import { Package } from '../../../src/package/domain/entity/package';
import { PackageStatus  } from '../../package/domain/entity/packageStatus.enum';

export class MockPackageRepository implements PackageRepository {
  private packages: Package[] = [];

  async createPackage(
    clientId: string,
    paymentId: string,
    orderId: string,
    origin: string,
    destiny: string,
    weight: number,
    details?: string
  ): Promise<Package> {
    const newPackage = new Package('1', clientId, paymentId, orderId, origin, destiny, weight, weight * 2, weight * 3, PackageStatus.Paid, new Date(), new Date(), details, null);
    this.packages.push(newPackage);
    return newPackage;
  }


}
