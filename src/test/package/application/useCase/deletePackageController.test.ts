import { Request, Response } from 'express';
import { DeletePackageController } from '../../../../package/infrastructure/controllers/deletePackageController';
import { DeletePackageUseCase } from '../../../../package/application/useCase/deletePackageUseCase';
import { ParamsDictionary } from 'express-serve-static-core';


// Mock del use case
const mockDeletePackageUseCase = {
    execute: jest.fn(),
};

// Crear instancias simuladas de Request y Response
const mockRequest = (params: ParamsDictionary) => {
    const req: Partial<Request> = {
        params,
    };
    return req as Request;
};

const mockResponse = () => {
    const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
    };
    return res as Response;
};

describe('DeletePackageController', () => {
    let controller: DeletePackageController;

    beforeEach(() => {
        // Crear una nueva instancia del controlador antes de cada prueba
        controller = new DeletePackageController(mockDeletePackageUseCase as unknown as DeletePackageUseCase);
    });

    it('debería eliminar el paquete y retornar un estado 204', async () => {
        // Mockear el retorno del use case para simular una eliminación exitosa
        mockDeletePackageUseCase.execute.mockResolvedValue(true);

        const req = mockRequest({ id: '1' });
        const res = mockResponse();

        await controller.handle(req, res);

        // Verificar que el status y send hayan sido llamados correctamente
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });

    it('debería retornar un error si el paquete no se encuentra', async () => {
        // Mockear el use case para lanzar una excepción indicando que el paquete no se encontró
        mockDeletePackageUseCase.execute.mockRejectedValue(new Error('Package not found'));

        const req = mockRequest({ id: '1' });
        const res = mockResponse();

        await controller.handle(req, res);

        // Verificar que el status y json hayan sido llamados correctamente
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Package not found' });
    });

    it('debería manejar errores inesperados y retornar un estado 404 con un mensaje por defecto', async () => {
        // Mockear el use case para lanzar una excepción sin un mensaje específico
        mockDeletePackageUseCase.execute.mockRejectedValue(new Error());

        const req = mockRequest({ id: '1' });
        const res = mockResponse();

        await controller.handle(req, res);

        // Verificar que el status y json hayan sido llamados correctamente
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Package not found' });
    });
});
