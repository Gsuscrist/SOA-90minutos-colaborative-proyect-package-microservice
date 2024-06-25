import express from "express";
import { createPackageController, getAllPackagesController, getPackageController, updatePackageController,updateStatusController,deletePackageController} from "../dependencies";


export const packageRoutes = express.Router();

packageRoutes.post('/', createPackageController.run.bind(createPackageController));
packageRoutes.get('/v1/get', getAllPackagesController.handle.bind(getAllPackagesController))
packageRoutes.get('/v1/get/:id', getPackageController.handle.bind(getPackageController))
packageRoutes.put('/v1/put', updatePackageController.run.bind(updatePackageController));
packageRoutes.patch('/v1/updateStatus', updateStatusController.run.bind(updateStatusController));
packageRoutes.delete('v1/get/:id', deletePackageController.handle.bind(deletePackageController));

