import {PackageRepository} from "../../domain/repository/packageRepository";

export class CalculateCostPackageUseCase{

    constructor(readonly repository:PackageRepository) {
    }

    async run(origin:string,destiny:string,weight:number){
        try {
            return await this.repository.calculateCost(origin,destiny,weight);
        }catch(err){
            console.log(err)
            return null
        }
    }
}