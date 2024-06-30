
import { GetAllPackagesUseCase  } from '../../../../package/application/useCase/getAllPackageUseCase';
import { Package } from '../../../../package/domain/entity/package';
import { PackageStatus } from '../../../../package/domain/entity/packageStatus.enum';
import { MockPackageRepository } from '../../../mock/packageRepositoryMock';

describe('GetAllPackagesUseCase', () => {
  let getAllPackagesUseCase: GetAllPackagesUseCase;
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
      1185,
      'Package details 1'
    );
    mockPackageRepository.createPackage(
      'client2',
      'payment2',
      'order2',
      'Origin Address 2',
      'Destiny Address 2',
      15,
      1185,
      'Package details 2'
    );

    // Inicializamos GetAllPackagesUseCase con el repositorio mockeado
    getAllPackagesUseCase = new GetAllPackagesUseCase(mockPackageRepository);
  });

  it('debería retornar todos los paquetes', async () => {
    const packages = await getAllPackagesUseCase.execute();
    expect(packages).toHaveLength(2);

    expect(packages[0]).toMatchObject({
      id: '1',
      clientId: 'client1',
      paymentId: 'payment1',
      orderId: 'order1',
      origin: 'Origin Address 1',
      destiny: 'Destiny Address 1',
      weight: 10,
      distance: 50,
      cost: 30,
      status: PackageStatus.Created,
      details: 'Package details 1',
    });

    expect(packages[1]).toMatchObject({
      id: '2',
      clientId: 'client2',
      paymentId: 'payment2',
      orderId: 'order2',
      origin: 'Origin Address 2',
      destiny: 'Destiny Address 2',
      weight: 15,
      distance: 50,
      cost: 45,
      status: PackageStatus.Created,
      details: 'Package details 2',
    });
  });

  // Puedes agregar más tests para otros casos específicos
});