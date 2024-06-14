import { Package } from "../../domain/entity/package";
import { PackageStatus } from "../../domain/entity/packageStatus.enum";
import {PackageRepository} from "../../domain/repository/packageRepository";
import { v4 as uuidv4 } from 'uuid';

export class MysqlPackageRepository implements PackageRepository {

    async calculate_distance(origin:string,destiny:string){
        //TODO:
        return 3;
    }

    async estimate_cost(distance:number,weight:number){
        const basePrice = 1051.87
        let price = distance * 1.25
        if(price < basePrice){
            price = basePrice
        }
        if (weight>85){
            price += 95
        }


        return price;
    }

    async createPackage(clientId: string, paymentId: string, orderId: string, origin: string, destiny: string, weight: number, details?: string | undefined): Promise<Package | null> {
        let oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
        try {
            const uuid = uuidv4()
            let distance = await this.calculate_distance(origin,destiny)
            let cost = await this.estimate_cost(distance,weight)
            let creationDate = Date.now()
            let deliveryDate = creationDate + oneWeekInMilliseconds;
            let status = PackageStatus.Created
            //todo: add mysql sentence y todo el show
            throw new Error("method not implemented");


        }catch (e){
            console.log("error:\n",e)
            return null;
        }
    }


}