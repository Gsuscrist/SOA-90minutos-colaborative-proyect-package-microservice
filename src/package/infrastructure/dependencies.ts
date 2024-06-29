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
import { DeletePackageController } from "./controllers/deletePackageController";
import { DeletePackageUseCase } from "../application/useCase/deletePackageUseCase";
import {CheckUserDiscountResponseSaga} from "./services/CheckUserDiscountResponseSaga";
import {GetAllPackageCommentRequestSaga} from "./services/GetAllPackageCommentRequestSaga";
import {GetAllPackageRatingRequestSaga} from "./services/GetAllPackageRatingRequestSaga";
import {GetAllPackagesRequestSaga} from "./services/GetAllPackagesRequestSaga";
import {DiscountRequestSaga} from "./services/DiscountRequestSaga";
import { PaymentPackageNotificationSaga } from './services/PaymentPackageNotificationSaga';
import { GetUserInfoRequestSaga } from "./services/GetUserInfoRequestSaga";
import { GetUserInfoResponseSaga } from "./services/GetUserInfoResponseSaga";
import { NotificationPackageDeliveredUseCase } from "../application/useCase/NotificationPackageDeliveredUseCase";



const mysqlPackageRepository = new MysqlPackageRepository();

export const initCheckUserDiscountResponseSaga = new CheckUserDiscountResponseSaga();
export const initGetAllPackageCommentRequestSaga = new GetAllPackageCommentRequestSaga();
export const initGetAllPackageRatingRequestSaga = new GetAllPackageRatingRequestSaga();
export const initGetAllPackagesRequestSaga = new GetAllPackagesRequestSaga();
export const initDiscountRequestSaga = new DiscountRequestSaga();
export const paymentPackageNotificationSaga = new PaymentPackageNotificationSaga();
export const getUserInfoRequestSaga = new GetUserInfoRequestSaga();

export const notificationPackageDeliveredUseCase = new NotificationPackageDeliveredUseCase(paymentPackageNotificationSaga);
export const getUserInfoResponseSaga = new GetUserInfoResponseSaga(notificationPackageDeliveredUseCase)


const createPackageUseCase = new CreatePackageUseCase(mysqlPackageRepository, initDiscountRequestSaga);

export const createPackageController = new CreatePackageController(createPackageUseCase);

const getPackageUseCase = new GetPackageUseCase(mysqlPackageRepository);
export const getPackageController = new GetPackageController(getPackageUseCase);

const getAllPackagesUseCase = new GetAllPackagesUseCase(mysqlPackageRepository);
export const getAllPackagesController = new GetAllPackagesController(getAllPackagesUseCase);

const updatePackageUseCase = new UpdatePackageUseCase(mysqlPackageRepository);
export const updatePackageController = new UpdatePackageController(updatePackageUseCase);

const updateStatusUseCase = new UpdateStatusUseCase(mysqlPackageRepository, getUserInfoRequestSaga);
export const updateStatusController = new UpdateStatusController(updateStatusUseCase);

const deletePackageUseCase = new DeletePackageUseCase(mysqlPackageRepository);
export const deletePackageController = new DeletePackageController(deletePackageUseCase);

