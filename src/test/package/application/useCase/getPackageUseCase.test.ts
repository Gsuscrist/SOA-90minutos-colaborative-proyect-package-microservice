// test/package/application/useCase/getPackageUseCase.test.ts

import { GetPackageUseCase } from '../../../../package/application/useCase/getPackageUseCase';
import { Package } from '../../../../package/domain/entity/package';
import { PackageStatus } from '../../../../package/domain/entity/packageStatus.enum';
import { MockPackageRepository } from '../../../mock/packageRepositoryMock';

describe('GetPackageUseCase', () => {
    let getPackageUseCase: GetPackageUseCase;
    let mockPackageRepository: MockPackageRepository;
  
    beforeEach(() => {
      // Inicializamos MockPackageRepository
      mockPackageRepository = new MockPackageRepository();
  
      // Añadir datos de prueba a MockPackageRepository
      mockPackageRepository.createPackage(
        'client1',
        'payment1',
        'order1',
        'Origin Address 1',
        'Destiny Address 1',
        10,
        'Package details 1'
      );
      mockPackageRepository.createPackage(
        'client2',
        'payment2',
        'order2',
        'Origin Address 2',
        'Destiny Address 2',
        15,
        'Package details 2'
      );
  
      // Inicializamos GetPackageUseCase con el repositorio mockeado
      getPackageUseCase = new GetPackageUseCase(mockPackageRepository);
    });
  
    it('debería retornar el paquete correcto por ID', async () => {
      const pkg = await getPackageUseCase.execute('1');
  
      // Compara las propiedades clave
      expect(pkg).toMatchObject({
        id: '1',
        clientId: 'client1',
        paymentId: 'payment1',
        orderId: 'order1',
        origin: 'Origin Address 1',
        destiny: 'Destiny Address 1',
        weight: 10,
        distance: 20,
        cost: 30,
        status: PackageStatus.Paid,
        details: 'Package details 1',
      });
  
      // Verifica manualmente las fechas si es necesario
      expect(pkg.creationDate).toBeInstanceOf(Date);
      expect(pkg.deliveryDate).toBeInstanceOf(Date);
    });
  
    it('debería lanzar un error si el paquete no existe', async () => {
      await expect(getPackageUseCase.execute('999')).rejects.toThrow('Package not found');
    });
  
    // Otros tests específicos que puedas necesitar
  });