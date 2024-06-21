import { Package } from "../../domain/entity/package";
import { PackageStatus } from "../../domain/entity/packageStatus.enum";
import { PackageRepository } from "../../domain/repository/packageRepository";
import { v4 as uuidv4 } from 'uuid';
import { query } from '../../../database/mysql';

export class MysqlPackageRepository implements PackageRepository {
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


    async findById(id: string): Promise<Package | null> {
        try {
            const [rows] = await query('SELECT * FROM packages WHERE id = ?', [id]) as [any[], any];
            if (!rows || rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new Package(
                row.id,
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
                row.deletedAt ? new Date(row.deletedAt) : undefined
            );
        } catch (error) {
            console.error("Error in MysqlPackageRepository.findById:", error);
            return null;
        }
    }

    async calculate_distance(origin: string, destiny: string): Promise<number> {
        // Simulated distance for now
        return Math.floor(Math.random() * (1000 - 20 + 1)) + 20;
    }

    async check_discount(clientId: string) {
        // Simulated discount check
        return "anual";
    }

    async estimate_cost(distance: number, weight: number, clientId: string) {
        const basePrice = 1051.87;
        let price = distance * 1.25;
        if (price < basePrice) {
            price = basePrice;
        }
        if (weight > 85) {
            price += 95;
        }

        switch (await this.check_discount(clientId)) {
            case "anual":
                price -= 2;
                break;
            case "mensual":
                price -= 1;
                break;
            case "anualy1erEnvio":
                price -= 4;
                break;
            case "mensualy1erEnvio":
                price -= 2;
                break;
            default:
                break;
        }

        return price;
    }

    async createPackage(clientId: string, paymentId: string, orderId: string, origin: string, destiny: string, weight: number, details?: string | undefined): Promise<Package | null> {
        const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
        try {
            const uuid = uuidv4();
            const distance = await this.calculate_distance(origin, destiny);
            const cost = await this.estimate_cost(distance, weight, clientId);
            const creationDate = new Date();
            const deliveryDate = new Date(creationDate.getTime() + oneWeekInMilliseconds);
            const status = PackageStatus.Created;
            const deletedAt = null;

            // Format dates for MySQL
            const formattedCreationDate = creationDate.toISOString().slice(0, 19).replace('T', ' ');
            const formattedDeliveryDate = deliveryDate.toISOString().slice(0, 19).replace('T', ' ');

            const sql = "INSERT INTO packages (id, client_id, payment_id, order_id, origin, destiny, weight, distance, cost, status, creation_date, details, deleted_at, delivery_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const params = [uuid, clientId, paymentId, orderId, origin, destiny, weight, distance, cost, status, formattedCreationDate, details, deletedAt, formattedDeliveryDate];
            const result = await query(sql, params);

            if (result) {
                return new Package(uuid, clientId, paymentId, orderId, origin, destiny, weight, distance, cost, status, creationDate, deliveryDate, details);
            } else {
                throw new Error("Failed to create package");
            }
        } catch (e) {
            console.log("error:\n", e);
            return null;
        }
    }

    async findAll(): Promise<Package[]> {
        const [rows, fields] = await query('SELECT * FROM packages', []) as [any[], any];
        console.log('Rows:', rows); // Añadido para verificar la estructura de rows
        console.log('Fields:', fields); // Añadido para verificar la estructura de fields
        if (!Array.isArray(rows)) {
            throw new Error('Unexpected result format, expected rows to be an array');
        }
        return rows.map((row: any) => new Package(
            row.id,
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
            row.deletedAt ? new Date(row.deletedAt) : undefined
        ));
    }
}
