export type BaseResponse<T> = {
    message: string;
    data?: T;
    error?: Record<string, string>;
}

export type MetaPagination = {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
}

export type PaginatedResponse<T> = BaseResponse<T> & {
    meta: MetaPagination;
};