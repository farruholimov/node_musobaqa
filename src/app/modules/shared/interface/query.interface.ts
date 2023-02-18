export interface IDefaultQuery {
    offset?: number;
    limit?: number;
    page?: number;
    order?: string;
    orderBy?: string;
} 

export interface ISearchQuery extends IDefaultQuery {
    key?: string;
    keyword?: string;
} 