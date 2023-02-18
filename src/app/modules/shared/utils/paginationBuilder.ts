import { IPagination } from "../interface/pagination.interface"
import { IDefaultQuery } from "../interface/query.interface"

const buildPagination = (dataLength: number, sorts: IDefaultQuery): IPagination=> {
    const { page, limit } = sorts
    
    const pagesCount: number = Math.ceil(dataLength / limit)
    const nextPage: number = pagesCount < page + 1 ? null : page + 1
    const pagination: IPagination = {
        pages: pagesCount,
        current: page,
        next: nextPage,
        limit: limit
    }
    return pagination
}

export default buildPagination