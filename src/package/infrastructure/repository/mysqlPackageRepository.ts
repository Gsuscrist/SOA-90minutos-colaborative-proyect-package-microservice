import {Package} from "../../domain/entity/package";
import {PackageStatus} from "../../domain/entity/packageStatus.enum";
import {PackageRepository} from "../../domain/repository/packageRepository";
import {v4 as uuidv4} from 'uuid';
import {query} from '../../../database/mysql';
import {Client} from '@googlemaps/google-maps-services-js'
import {getMapsApiKey} from '../../../aws/parameter'


export class MysqlPackageRepository implements PackageRepository {
    async calculate_distance(origin:string, destiny:string): Promise<number> {
        const APIKEY = await getMapsApiKey();
        const client = new Client({});
        if (typeof(APIKEY) === "undefined") {throw new Error("Missing API KEY!");}
        try {
            const response = await client.distancematrix({
                params: {
                    origins: [origin],
                    destinations: [destiny],
                    key: APIKEY,
                },
                timeout: 1000, // milliseconds
            });
            if (response.data.rows[0].elements[0].status === 'OK') {
                const distanceInMeters = response.data.rows[0].elements[0].distance.value;
                console.log("distance: ",distanceInMeters)
                return distanceInMeters / 1000;
            } else {
                throw new Error('No se pudo calcular la distancia.');
            }

        }catch (e){
            console.log("error en calculate_distance:\n",e)
            return 0;
        }
    }
    async check_discount(clientId:string){
        //TODO:
        // Rabbit brocker to get type of suscription of user and amount of 'envios'
        // le que regrese pasarlo a un switch para regresar el tipo de descuento que se hara

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
            case "yearly":
                price -= price  * 0.25
                break;
            case "monthly":
                price -= price  * 0.15
                break;
            case "firstShip":
                price -= price  * 0.75
                break;
            default:
                price = price
                break
        }
        //TODO: una vez que se implemente rabbitMQ en check_discount, descomentar lo siguiente:
        //return price;
        return 1051.87
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

    async findById(id: string): Promise<Package | null> {
        const SQL = 'SELECT * FROM packages WHERE id =?'
        const params:any[]=[id]
        const [rows]: any = await query(SQL, params);
        if (rows.length === 0) {
            return null;
        }
        return new Package(
            rows.id,
            rows.client_id,
            rows.payment_id,
            rows.order_id,
            rows.origin,
            rows.destiny,
            rows.weight,
            rows.distance,
            rows.cost,
            rows.status,
            new Date(rows.creation_date),
            new Date(rows.delivery_date),
            rows.details,
            rows.deleted_at ? new Date(rows.deleted_at) : undefined
        );
    }

    async findAll(): Promise<Package[]> {
        const sql="SELECT * FROM packages"
        const rows:any= await query(sql,[])
        console.log("rows:\n",rows)
        return rows.map((row: any) => new Package(row.id,
            row.clientId,
            row.paymentId,
            row.orderId,
            row.origin,
            row.destiny,
            row.weight,
            row.distance,
            row.cost,
            row.status,
            new Date(row.creationDate),
            new Date(row.deliveryDate),
            row.details,
            row.deletedAt ? new Date(row.deletedAt) : undefined));
    }
    async updateStatus(id: string, status: PackageStatus): Promise<Package | null | any> {
        try {
            console.log("Update status parameters:", { id, status });

            // Ejecutar la consulta UPDATE para actualizar el estado
            const sql = "UPDATE packages SET status = ? WHERE id = ?";
            const params = [status, id];

            console.log("SQL Query:", sql);
            console.log("SQL Parameters:", params);

            const result: any = await query(sql, params);

            console.log("Update result:", result);
            
            const tempSelectSql = "SELECT * FROM packages WHERE id = ?";
            const [rows] = await query(tempSelectSql, [id]) as [any[], any];

            console.log("Executed SELECT query:", tempSelectSql);
            console.log("Current row before update:", rows);

            

            // Verificar si la actualización afectó alguna fila
            if (result && result.affectedRows > 0) {
                // Retornar el id y el status actualizado
                return { id, status };
            } else {
                console.error("Failed to update status for package:", id);
                return null;
            }
        } catch (error) {
            console.error("Error in MysqlPackageRepository.updateStatus:", error);
            return null;
        }
    }

    async updatePackage(id: string, origin: string, destiny: string, weight: number, details?: string): Promise<any> {
        try {
            // Log input parameters
            console.log("Update parameters:", { id, origin, destiny, weight, details });

            // SELECT query to fetch current row
            const tempSelectSql = "SELECT * FROM packages WHERE id = ?";
            const [currentRow] = await query(tempSelectSql, [id]) as [any[], any];

            // Log the result of the SELECT query
            console.log("Executed SELECT query:", tempSelectSql);
            console.log("Current row before update:", currentRow);

            // Proceed with update only if the package exists
            if (!currentRow || currentRow.length === 0) {
                console.error("Package not found:", id);
                return { package: null, message: 'Package not found' };
            }

            const sql = "UPDATE packages SET origin = ?, destiny = ?, weight = ?, details = ? WHERE id = ?";
            const params = [origin, destiny, weight, details, id];

            // Log the query and parameters
            console.log("SQL Query:", sql);
            console.log("SQL Parameters:", params);

            const result: any = await query(sql, params);

            // Log the result of the query
            console.log("Update result:", result);

            if (result && result.affectedRows > 0) {
                // Manually construct the updated package object to return
                const updatedPackage = {
                    id,
                    origin,
                    destiny,
                    weight,
                    details
                };
                return { package: updatedPackage, message: 'Updated' };
            } else {
                return { package: null, message: 'Not updated: No rows affected. Ensure the package ID exists and the values are different.' };
            }
        } catch (error) {
            console.error("Error in MysqlPackageRepository.updatePackage:", error);
            return { package: null, message: 'Error occurred' };
        }
    }

}
