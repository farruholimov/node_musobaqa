import { IsDefined, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { IDefaultQuery, ISearchQuery } from "../interface/query.interface";

export class DefaultQueryDTO implements IDefaultQuery{
    @IsString()
    offset: number;

    @IsString()
    limit: number;

    @IsString()
    page: number;

    @IsString()
    order: string;

    @IsString()
    orderBy: string;

}

export class SearchQueryDTO extends DefaultQueryDTO implements ISearchQuery {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    keyword: string;
}
