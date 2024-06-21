import { MysqlPackageRepository } from "./repository/mysqlPackageRepository";

import { CreatePackageUseCase } from "../application/useCase/createPackageUseCase";
import { CreatePackageController } from "./controllers/createPackageController";

import { GetPackageUseCase } from "../application/useCase/getPackageUseCase";
import {GetPackageController} from "./controllers/getPackageController";
import { GetAllPackagesUseCase } from "../application/useCase/getAllPackageUseCase";
import { GetAllPackagesController } from "./controllers/getAllPackagesController";
import { UpdatePackageUseCase } from "../application/useCase/updatePackageUsecase";
import { UpdatePackageController } from "./controllers/updatePackageControllers";
import { UpdateStatusUseCase } from "../application/useCase/updateStatusUseCase";
import { UpdateStatusController } from "./controllers/updateStatusControllers";


const mysqlPackageRepository = new MysqlPackageRepository();

const createPackageUseCase = new CreatePackageUseCase(mysqlPackageRepository);

export const createPackageController = new CreatePackageController(createPackageUseCase);

const getPackageUseCase = new GetPackageUseCase(mysqlPackageRepository);
export const getPackageController = new GetPackageController(getPackageUseCase);

const getAllPackagesUseCase = new GetAllPackagesUseCase(mysqlPackageRepository);
export const getAllPackagesController = new GetAllPackagesController(getAllPackagesUseCase);

const updatePackageUseCase = new UpdatePackageUseCase(mysqlPackageRepository);
export const updatePackageController = new UpdatePackageController(updatePackageUseCase);

const updateStatusUseCase = new UpdateStatusUseCase(mysqlPackageRepository);
export const updateStatusController = new UpdateStatusController(updateStatusUseCase);

//! Descomentar para realizar deletePackageMethod
// const deletePackageUseCase = new DeletePackageUseCase(mysqlPackageRepository);
// export const deletePackageController = new DeletePackageController(deletePackageUseCase);