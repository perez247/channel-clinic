

export class PaginationRequest<T>
{
    private pagination?: AppPagination;
    private filter?: T;

    constructor(newPagination?: AppPagination, newFilter?: T) {
        this.pagination = newPagination;
        this.filter = newFilter;
    }

    setPagination(pagination: Partial<AppPagination>): void {
      const d = this.pagination;
      const p = pagination as AppPagination;
      this.pagination = { ...d, ...p };
    }

    setFilter(filter: Partial<T>): void {
      const d = this.filter;
      const p = filter as T;
      this.filter = { ...d, ...p };
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

export class PaginationContext<TElement, TFilter> {
  elements: TElement[] = [];
  request?: PaginationRequest<TFilter> = new PaginationRequest<TFilter>(new AppPagination(), {} as TFilter);
  response: PaginationResponse<TElement[]> = new PaginationResponse<TElement[]>();

  constructor() {
  }

  initialize(): void {
    this.elements = [];
    this.response = new PaginationResponse<TElement[]>();
    this.request = new PaginationRequest<TFilter>(new AppPagination(), {} as TFilter);
  }

  setResponse(response: PaginationResponse<TElement[]>, concat: boolean): void {
    this.response = response;
    if (concat) {
      this.elements = this.elements.concat(response.result || []);
    } else {
      this.elements = response.result || [];
    }
  }
}
