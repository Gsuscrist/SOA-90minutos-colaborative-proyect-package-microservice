import { PackageStatus } from "../../domain/entity/packageStatus.enum";
import { Package } from "../../domain/entity/package";
import { PackageRepository } from "../../domain/repository/packageRepository";
import { GetUserInfoRequestSaga } from "../../infrastructure/services/GetUserInfoRequestSaga";


//updateStatus(id: string, status: PackageStatus):Promise<Package | null>;

export class UpdateStatusUseCase {
    constructor(readonly repository: PackageRepository, readonly queue: GetUserInfoRequestSaga) {}

    async run(
        id: string,
        status: PackageStatus
    ): Promise<Package | null| any> {
        try {
            
            const result = await this.repository.updateStatus(id, status);
            if (result && result) {
                if (status === PackageStatus.Delivered) {
                    this.queue.execute(id);
                }
                return result;
            } else {
                console.error("Update failed:");
                return null;
            }
        } catch (e) {
            console.error("Error in UpdateStatusUseCase:", e);
            return null;
        }
    }


}
