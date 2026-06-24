export interface Sort{
    sorted : boolean;
    unsorted : boolean;
    empty : boolean;
}

export interface Pageable{
    pageNumber : number;
    pageSize : number;
    offset : number;
    sort : Sort;
    unpaged : boolean;
    paged : boolean;
}

export interface Page<T>{
    content : T[];

    pageable : Pageable;

    totalPages : number;
    totalElements : number;

    last : boolean;
    first : boolean;

    numberOfElements : number;
    number : number;
    size : number;

    empty : boolean;
    sort : Sort;
}