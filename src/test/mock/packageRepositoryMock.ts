

import { GetPackageUseCase } from '../../package/application/useCase/getPackageUseCase'; 
import { Package } from '../../package/domain/entity/package';
import { PackageStatus } from '../../package/domain/entity/packageStatus.enum';
import { PackageRepository } from '../../package/domain/repository/packageRepository'; 


export class MockPackageRepository implements PackageRepository {
  updatePackage(id: string, origin: string, destiny: string, weight: number, details?: string | undefined): Promise<Package | null> {
    throw new Error('Method not implemented.');
  }
  updateStatus(id: string, status: PackageStatus): Promise<any> {
    throw new Error('Method not implemented.');
  }
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
    // Simular el cálculo de la distancia
    const distance = this.calculateDistance(origin, destiny);

    const creationDate = new Date();
    // Para deliveryDate, podemos asignar una fecha futura o la misma creación para simplificar
    const deliveryDate = new Date(creationDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 días después de la creación

    const newPackage = new Package(
      (this.packages.length + 1).toString(), // Generar ID único
      clientId, 
      paymentId, 
      orderId, 
      origin, 
      destiny, 
      weight, 
      distance, // Asignar la distancia calculada
      weight * 3, // Supongamos que el costo es weight * 3
      PackageStatus.Created, 
      creationDate, 
      deliveryDate, // Asignar una fecha válida para deliveryDate
      details, 
      null // Permitir `null` para deletedAt si es necesario
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

  // Función simulada para calcular la distancia
  private calculateDistance(origin: string, destiny: string): number {
    // Simular cálculo de distancia (puedes reemplazar esto con una fórmula real)
    return 50; // Para la prueba, usamos una distancia simulada de 50 km
  }
}