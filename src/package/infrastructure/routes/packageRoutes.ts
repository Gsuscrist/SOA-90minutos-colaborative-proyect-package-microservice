import express from "express";
import { createPackageController } from "../dependencies";

export const packageRoutes = express.Router();

packageRoutes.post('/', createPackageController.run.bind(createPackageController));