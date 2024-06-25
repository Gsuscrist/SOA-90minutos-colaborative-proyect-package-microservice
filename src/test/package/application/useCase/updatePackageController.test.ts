import { Request, Response } from 'express';
import { UpdatePackageController } from '../../../../package/infrastructure/controllers/updatePackageControllers';
import { UpdatePackageUseCase } from '../../../../package/application/useCase/updatePackageUsecase';

// Mock del use case
const mockUpdatePackageUseCase = {
    run: jest.fn(),
};

// Crear instancias simuladas de Request y Response
const mockRequest = () => {
    const req: Partial<Request> = {
        body: {
            id: '1',
            origin: 'New Origin',
            destiny: 'New Destiny',
            weight: 20,
            details: 'Updated Details',
        },
    };
    return req as Request;
};

const mockResponse = () => {
    const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
    };
    return res as Response;
};

describe('UpdatePackageController', () => {
    let controller: UpdatePackageController;

    beforeEach(() => {
        // Crear una nueva instancia del controlador antes de cada prueba
        controller = new UpdatePackageController(mockUpdatePackageUseCase as unknown as UpdatePackageUseCase);
    });

    it('debería actualizar el paquete y retornar una respuesta exitosa', async () => {
        // Mockear el retorno del use case para simular una actualización exitosa
        const updatedPackage = {
            id: '1',
            origin: 'New Origin',
            destiny: 'New Destiny',
            weight: 20,
            details: 'Updated Details',
        };
        mockUpdatePackageUseCase.run.mockResolvedValue(updatedPackage);

        const req = mockRequest();
        const res = mockResponse();

        await controller.run(req, res);

        // Verificar que el status y send hayan sido llamados correctamente
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            status: 'Success',
            data: updatedPackage,
            message: 'Package update succeeded',
        });
    });

    it('debería retornar un error si la actualización falla', async () => {
        // Mockear el retorno del use case para simular una falla en la actualización
        mockUpdatePackageUseCase.run.mockResolvedValue(null);

        const req = mockRequest();
        const res = mockResponse();

        await controller.run(req, res);

        // Verificar que el status y send hayan sido llamados correctamente
        expect(res.status).toHaveBeenCalledWith(417);
        expect(res.send).toHaveBeenCalledWith({
            status: 'Error',
            data: [],
            message: 'Package update failed',
        });
    });

    it('debería manejar errores y retornar un estado 500', async () => {
        // Mockear el use case para lanzar una excepción
        mockUpdatePackageUseCase.run.mockRejectedValue(new Error('Test error'));

        const req = mockRequest();
        const res = mockResponse();

        await controller.run(req, res);

        // Verificar que el status y send hayan sido llamados correctamente
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            status: 'Error',
            message: 'Internal Server Error',
        });
    });
});
