
import express from 'express';
import { Signale } from 'signale';
import { packageRoutes } from './package/infrastructure/routes/packageRoutes';
import {
    getUserInfoResponseSaga,
    initCheckUserDiscountResponseSaga,
    initDiscountRequestSaga,
    initGetAllPackageCommentRequestSaga,
    initGetAllPackageRatingRequestSaga,
    initGetAllPackagesRequestSaga
} from './package/infrastructure/dependencies';
const bodyParser = require('body-parser');
const app = express();
let server = null;
const signale = new Signale();

app.use(express.json())

app.use('/package', packageRoutes);
app.use(bodyParser.json());



async function startServer() {
    await initCheckUserDiscountResponseSaga.listenForCheckUserDiscountResponses();
    await initGetAllPackageCommentRequestSaga.listenForGetAllPackageCommentRequests();
    await initGetAllPackageRatingRequestSaga.listenForGetAllPackageRatingRequests();
    await initGetAllPackagesRequestSaga.listenForGetAllPackagesRequests();
    await getUserInfoResponseSaga.execute();
    server = app.listen(8080, () => {
        signale.success("Server on line in port: 8080")
    })
}

startServer();
