import { Package } from "../../domain/entity/package";
import { PackageStatus } from "../../domain/entity/packageStatus.enum";
import {PackageRepository} from "../../domain/repository/packageRepository";
import { v4 as uuidv4 } from 'uuid';
import { query } from '../../../database/mysql';

export class MysqlPackageRepository implements PackageRepository {

    async calculate_distance(origin:string, destiny:string): Promise<number> {
        //TODO:
        //Por el momento será distancia simulada
        // return 3;    
        return Math.floor(Math.random() * (1000 - 20 + 1)) + 20;
    }
    async check_discount(clientId:string){
        //TODO: get client suscription type
        // CON RABBIT
        // si es anual, mensual o no tiene devolverlo
        // si si tiene aparte del tipo regresar si es el primer envio

        return "anual";
        // return "mensual";
        // return 0;
    }

    async estimate_cost(distance:number,weight:number, clientId:string){
        const basePrice = 1051.87
        let price = distance * 1.25
        if(price < basePrice){
            price = basePrice
        }
        if (weight>85){
            price += 95
        }

        switch (await this.check_discount(clientId)){
            case "anual":
                price -= 2
                break;
            case "mensual":
                price -= 1
                break;
            case "anualy1erEnvio":
                price -= 4
                break;
            case "mensualy1erEnvio":
                price -= 2
                break;
            default:
                price = price
        }


        return price;
    }

    async createPackage(clientId: string, paymentId: string, orderId: string, origin: string, destiny: string, weight: number, details?: string | undefined): Promise<Package | null> {
        let oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
        try {

            // let creationDates = new Date()
            
            const uuid = uuidv4()
            let distance = await this.calculate_distance(origin, destiny)
            let cost = await this.estimate_cost(distance,weight,clientId)
            // let creationDate = Date.now()
            let creationDate = new Date();
            const deliveryDate = new Date(creationDate.getTime() + oneWeekInMilliseconds);
            let status = PackageStatus.Created
            const deletedAt = null;

            //formateamos las fechas para asegurarnos de que sean compatibles con el formato de MySQL
            const formattedCreationDate = creationDate.toISOString().slice(0, 19).replace('T', ' ');
            const formattedDeliveryDate = deliveryDate.toISOString().slice(0, 19).replace('T', ' ');


            const sql = "INSERT INTO packages (id, client_id, payment_id, order_id, origin, destiny, weight, distance, cost, status, creation_date, details, deleted_at, delivery_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const params = [uuid, clientId, paymentId, orderId, origin, destiny, weight, distance, cost, status, formattedCreationDate, details, deletedAt, formattedDeliveryDate ];
            const result = await query(sql, params);

            if (result) {
                return new Package(uuid, clientId, paymentId, orderId, origin, destiny, weight, distance, cost, status, creationDate, deliveryDate, details);
            } else {
                throw new Error("Failed to create package");
            }

        }catch (e){
            console.log("error:\n",e)
            return null;
        }
    }


}