// test/package/application/useCase/getPackageUseCase.test.ts

import { GetPackageUseCase } from '../../package/application/useCase/getPackageUseCase'; // Asegúrate de que esta ruta sea correcta
import { Package } from '../../package/domain/entity/package';
import { PackageStatus } from '../../package/domain/entity/packageStatus.enum';
import { PackageRepository } from '../../package/domain/repository/packageRepository'; // Importa la interfaz del repositorio


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
    const newPackage = new Package(
      (this.packages.length + 1).toString(), // Generar ID único
      clientId, 
      paymentId, 
      orderId, 
      origin, 
      destiny, 
      weight, 
      weight * 2, 
      weight * 3, 
      PackageStatus.Paid, // Usando el estado correcto
      new Date(), 
      new Date(), 
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
}