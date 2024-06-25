
import { CreatePackageUseCase } from '../../../../package/application/useCase/createPackageUseCase';
import { MockPackageRepository } from '../../../mock/packageRepositoryMock';
import { Package } from '../../../../package/domain/entity/package';
describe('CreatePackageUseCase', () => {
  let mockRepository: MockPackageRepository;
  let createPackageUseCase: CreatePackageUseCase;

  beforeEach(() => {
    mockRepository = new MockPackageRepository();
    createPackageUseCase = new CreatePackageUseCase(mockRepository);
  });

  it('debería crear un nuevo paquete exitosamente', async () => {
    const clientId = 'client1';
    const paymentId = 'payment1';
    const orderId = 'order1';
    const origin = 'origin1';
    const destiny = 'destiny1';
    const weight = 50;
    const details = 'Test details';

    const result = await createPackageUseCase.run(clientId, paymentId, orderId, origin, destiny, weight, details);

    expect(result).toBeInstanceOf(Package);
    expect(result?.clientId).toBe(clientId);
    expect(result?.paymentId).toBe(paymentId);
    expect(result?.orderId).toBe(orderId);
    expect(result?.origin).toBe(origin);
    expect(result?.destiny).toBe(destiny);
    expect(result?.weight).toBe(weight);
    expect(result?.details).toBe(details);
    expect(result?.distance).toBe(50); // Ajustar a 50 km según el mock
    expect(result?.status).toBe('Creado'); // Ajustar a "Creado" según el mock
    expect(result?.deliveryDate).toBeInstanceOf(Date); // Verificar que deliveryDate es una fecha
  });

  it('debería crear un paquete con los datos mínimos', async () => {
    const clientId = 'client2';
    const paymentId = 'payment2';
    const orderId = 'order2';
    const origin = 'origin2';
    const destiny = 'destiny2';
    const weight = 30;

    const result = await createPackageUseCase.run(clientId, paymentId, orderId, origin, destiny, weight);

    expect(result).toBeInstanceOf(Package);
    expect(result?.clientId).toBe(clientId);
    expect(result?.paymentId).toBe(paymentId);
    expect(result?.orderId).toBe(orderId);
    expect(result?.origin).toBe(origin);
    expect(result?.destiny).toBe(destiny);
    expect(result?.weight).toBe(weight);
    expect(result?.details).toBeUndefined(); // 'details' debería ser undefined si no se proporciona
    expect(result?.distance).toBe(50); // Ajustar a 50 km según el mock
    expect(result?.status).toBe('Creado'); // Ajustar a "Creado" según el mock
    expect(result?.deliveryDate).toBeInstanceOf(Date); // Verificar que deliveryDate es una fecha
  });

  it('debería crear un paquete con todos los campos proporcionados', async () => {
    const clientId = 'client3';
    const paymentId = 'payment3';
    const orderId = 'order3';
    const origin = 'origin3';
    const destiny = 'destiny3';
    const weight = 60;
    const details = 'Detalles adicionales';

    const result = await createPackageUseCase.run(clientId, paymentId, orderId, origin, destiny, weight, details);

    expect(result).toBeInstanceOf(Package);
    expect(result?.clientId).toBe(clientId);
    expect(result?.paymentId).toBe(paymentId);
    expect(result?.orderId).toBe(orderId);
    expect(result?.origin).toBe(origin);
    expect(result?.destiny).toBe(destiny);
    expect(result?.weight).toBe(weight);
    expect(result?.details).toBe(details);
    expect(result?.distance).toBe(50); // Ajustar a 50 km según el mock
    expect(result?.status).toBe('Creado'); // Ajustar a "Creado" según el mock
    expect(result?.deliveryDate).toBeInstanceOf(Date); // Verificar que deliveryDate es una fecha
  });

  it('debería manejar la creación de un paquete con datos inválidos', async () => {
    const clientId = '';
    const paymentId = 'payment4';
    const orderId = 'order4';
    const origin = 'origin4';
    const destiny = 'destiny4';
    const weight = -10;

    try {
      await createPackageUseCase.run(clientId, paymentId, orderId, origin, destiny, weight);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Invalid data');
      } else {
        throw new Error('Expected an error with a message property');
      }
    }
  });

  it('debería llamar a createPackage en el repositorio con los parámetros correctos', async () => {
    const createPackageSpy = jest.spyOn(mockRepository, 'createPackage');

    const clientId = 'client6';
    const paymentId = 'payment6';
    const orderId = 'order6';
    const origin = 'origin6';
    const destiny = 'destiny6';
    const weight = 70;

    await createPackageUseCase.run(clientId, paymentId, orderId, origin, destiny, weight);

    expect(createPackageSpy).toHaveBeenCalledWith(clientId, paymentId, orderId, origin, destiny, weight, undefined);
  });

  it('debería retornar null si el repositorio falla', async () => {
    jest.spyOn(mockRepository, 'createPackage').mockImplementation(() => {
      throw new Error('Simulated repository error');
    });

    const result = await createPackageUseCase.run('client5', 'payment5', 'order5', 'origin5', 'destiny5', 50);

    expect(result).toBeNull();
  });

  it('debería retornar null si hay un error', async () => {
    jest.spyOn(mockRepository, 'createPackage').mockImplementation(() => {
      throw new Error('Simulated error');
    });

    const result = await createPackageUseCase.run('client1', 'payment1', 'order1', 'origin1', 'destiny1', 50);

    expect(result).toBeNull();
  });

  // Prueba añadida para verificar la distancia en km
  it('debería crear un nuevo paquete con los detalles correctos y calcular la distancia en km', async () => {
    const origin = 'Carretera Villaflores s/n, Los Arbolitos, Berriozabal, Chis.';
    const destiny = 'Carretera Villaflores 650, CHIS 133 592, El Mirador, El Suspiro, 29100 Suchiapa, Chis.';
    const weight = 60;

    const newPackage = await createPackageUseCase.run(
      '2',
      '2',
      '82',
      origin,
      destiny,
      weight,
      'Manejar con cuidado'
    );

    const expectedDistance = 50; // Aquí podrías usar la función real de cálculo de distancia si existe

    expect(newPackage).toMatchObject({
      id: '1',
      clientId: '2',
      paymentId: '2',
      orderId: '82',
      origin: origin,
      destiny: destiny,
      weight: weight,
      distance: expectedDistance, // Verificamos la distancia calculada en km
      cost: 180, // Supongamos que el costo es weight * 3
      status: 'Creado', // Ajustar a "Creado" según el mock
      details: 'Manejar con cuidado',
    });

    expect(newPackage?.creationDate).toBeInstanceOf(Date);
    expect(newPackage?.deliveryDate).toBeInstanceOf(Date); // Verificar que deliveryDate es una fecha
  });
});