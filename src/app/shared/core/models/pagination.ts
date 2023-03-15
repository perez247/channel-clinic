

export class PaginationRequest<T>
{
    pagination?: AppPagination;
    filter?: T;

    constructor(newPagination: AppPagination, newFilter: T) {
        this.pagination = newPagination;
        this.filter = newFilter;
    }
}

export class PaginationResponse<T>
{
    pageNumber: number = 1;
    pageSize: number = 10;
    totalItems: number = 10;
    result?: T;
}

export class AppPagination
{
    pageNumber: number = 1;
    pageSize: number = 10;
}
