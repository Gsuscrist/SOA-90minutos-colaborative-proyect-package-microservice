import express from "express";
import {
  createPackageController,
  getAllPackagesController,
  getPackageController,
  updatePackageController,
  updateStatusController
} from "../dependencies";

export const packageRoutes = express.Router();

packageRoutes.post('/', createPackageController.run.bind(createPackageController));
packageRoutes.get('/v1/getall', getAllPackagesController.handle.bind(getAllPackagesController));
packageRoutes.get('/v1/get/:id', getPackageController.handle.bind(getPackageController));
packageRoutes.put('/v1/put', updatePackageController.run.bind(updatePackageController));
packageRoutes.patch('/v1/updateStatus', updateStatusController.run.bind(updateStatusController));
