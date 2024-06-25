import { Request, Response } from 'express';
import { UpdateStatusController } from '../../../../package/infrastructure/controllers/updateStatusControllers';
import { UpdateStatusUseCase } from '../../../../package/application/useCase/updateStatusUseCase';
import { PackageStatus } from '../../../../package/domain/entity/packageStatus.enum';

// Mock del use case
const mockUpdateStatusUseCase = {
    run: jest.fn(),
};

// Crear instancias simuladas de Request y Response
const mockRequest = (body: object) => {
    const req: Partial<Request> = {
        body,
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

describe('UpdateStatusController', () => {
    let controller: UpdateStatusController;

    beforeEach(() => {
        // Crear una nueva instancia del controlador antes de cada prueba
        controller = new UpdateStatusController(mockUpdateStatusUseCase as unknown as UpdateStatusUseCase);
    });

    it('debería actualizar el estado del paquete y retornar una respuesta exitosa', async () => {
        // Mockear el retorno del use case para simular una actualización exitosa
        const updatedPackage = {
            id: '1',
            status: PackageStatus.Delivered,
        };
        mockUpdateStatusUseCase.run.mockResolvedValue(updatedPackage);

        const req = mockRequest({ id: '1', status: 'Delivered' });
        const res = mockResponse();

        await controller.run(req, res);

        // Verificar que el status y send hayan sido llamados correctamente
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            status: 'Success',
            data: updatedPackage,
            message: 'Package status update succeeded',
        });
    });

    it('debería retornar un error si el estado es inválido', async () => {
        const req = mockRequest({ id: '1', status: 'InvalidStatus' });
        const res = mockResponse();

        await controller.run(req, res);

        // Verificar que el status y send hayan sido llamados correctamente
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            status: 'Error',
            message: 'Invalid package status',
        });
    });

    it('debería retornar un error si la actualización falla', async () => {
        // Mockear el retorno del use case para simular una falla en la actualización
        mockUpdateStatusUseCase.run.mockResolvedValue(null);

        const req = mockRequest({ id: '1', status: 'Delivered' });
        const res = mockResponse();

        await controller.run(req, res);

        // Verificar que el status y send hayan sido llamados correctamente
        expect(res.status).toHaveBeenCalledWith(417);
        expect(res.send).toHaveBeenCalledWith({
            status: 'Error',
            data: [],
            message: 'Package status update failed',
        });
    });

    it('debería manejar errores y retornar un estado 500', async () => {
        // Mockear el use case para lanzar una excepción
        mockUpdateStatusUseCase.run.mockRejectedValue(new Error('Test error'));

        const req = mockRequest({ id: '1', status: 'Delivered' });
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
