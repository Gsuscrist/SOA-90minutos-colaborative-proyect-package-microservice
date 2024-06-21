import express from "express";
import { createPackageController, getAllPackagesController, getPackageController} from "../dependencies";

export const packageRoutes = express.Router();

packageRoutes.post('/', createPackageController.run.bind(createPackageController));

packageRoutes.get('/v1/get', getAllPackagesController.handle.bind(getAllPackagesController))

packageRoutes.get('/v1/get/:id', getPackageController.handle.bind(getPackageController))

//! Uncomment
// packageRoutes.delete('v1/get/:id', deletePackageController.handle.bind(deletePackageController));