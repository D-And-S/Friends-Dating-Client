export interface Pagination {
    currentPage: number ;
    itemPerPage: number;
    totalItems: number;
    totalPages: number;
}

//here T will respresent array of something: e.g. PaginatedResult<Member[]>
export class PaginatedResult<T> {
    result! : T ;
    pagination: Pagination | any
}