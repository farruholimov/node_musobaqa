import { getFirst } from "../../shared/utils/utils";
import KnexService from "../../../database/connection";

export default class HelperDAO {
    async getMaxValue(table: string, column: string, as: string = "maxValue"){
        const result = getFirst(
            await KnexService(table)
                .max(column, {as: as})
        )
        return result[as]
    }
    async getMinValue(table: string, column: string, as: string = "minValue"){
        const result = getFirst(
            await KnexService(table)
                .min(column, {as: as})
        )
        return result[as]
    }
    async getSum(table: string, column: string, as: string = "sum"){
        const result = getFirst(
            await KnexService(table)
                .sum(`${column} as ${as}`)
        )
        return result[as]
    }
}