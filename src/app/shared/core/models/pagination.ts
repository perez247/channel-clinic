

export class PaginationRequest<T>
{
    private pagination?: AppPagination;
    private filter?: T;

    constructor(newPagination: AppPagination, newFilter: T) {
        this.pagination = newPagination;
        this.filter = newFilter;
    }

    setPagination(pagination: AppPagination): void {
      this.pagination = { ...pagination };
    }

    setFilter(filter: T): void {
      this.filter = { ...filter };
    }

    getPagination(): AppPagination | undefined {
      return this.pagination;
    }

    getFilter(): T | undefined {
      return this.filter;
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
