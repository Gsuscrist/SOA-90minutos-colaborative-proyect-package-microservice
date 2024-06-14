import { MysqlPackageRepository } from "./repository/mysqlPackageRepository";

import { CreatePackageUseCase } from "../application/useCase/createPackageUseCase";
import { CreatePackageController } from "./controllers/createPackageController";

const mysqlPackageRepository = new MysqlPackageRepository();

const createPackageUseCase = new CreatePackageUseCase(mysqlPackageRepository);

export const createPackageController = new CreatePackageController(createPackageUseCase);
