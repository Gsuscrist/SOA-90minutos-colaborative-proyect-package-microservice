import { MysqlPackageRepository } from "./repository/mysqlPackageRepository";

import { CreatePackageUseCase } from "../application/useCase/createPackageUseCase";
import { CreatePackageController } from "./controllers/createPackageController";

import { GetPackageUseCase } from "../application/useCase/getPackageUseCase";
import {GetPackageController} from "./controllers/getPackageController";
import { GetAllPackagesUseCase } from "../application/useCase/getAllPackageUseCase";
import { GetAllPackagesController } from "./controllers/getAllPackagesController";

import { DeletePackageUseCase } from "../application/useCase/deletePackageUseCase";
import { DeletePackageController } from "./controllers/deletePackageController";

const mysqlPackageRepository = new MysqlPackageRepository();

const createPackageUseCase = new CreatePackageUseCase(mysqlPackageRepository);

export const createPackageController = new CreatePackageController(createPackageUseCase);

const getPackageUseCase = new GetPackageUseCase(mysqlPackageRepository);
export const getPackageController = new GetPackageController(getPackageUseCase);

const getAllPackagesUseCase = new GetAllPackagesUseCase(mysqlPackageRepository);
export const getAllPackagesController = new GetAllPackagesController(getAllPackagesUseCase);


const deletePackageUseCase = new DeletePackageUseCase(mysqlPackageRepository);
export const deletePackageController = new DeletePackageController(deletePackageUseCase);