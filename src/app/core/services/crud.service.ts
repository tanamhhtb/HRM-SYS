import { HttpClient , HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "../models/page.model";

@Injectable()
export abstract class CrudService<T> {
    protected constructor(
        protected http:HttpClient,
        protected apiUrl: string
    ){}

    list() : Observable<T[]> {
        return this.http.get<T[]>(this.apiUrl);
    }

    getPage(
        page: string = '0',
        size: string = '10',
        sort?: string
    ) : Observable<Page<T>> {
        let params = new HttpParams()
            .set('page', page)
            .set('size', size);

        if(sort) params = params.set('sort',sort);
        return this.http.get<Page<T>>(this.apiUrl, {params})
    }

    get(
        id: number | string
    ): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${id}`);
    }

    create(
        data: T
    ): Observable<T> {
        return this.http.post<T>(this.apiUrl, data);
    }

    update(
        id: number | string,
        data: T
    ): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}/${id}`, data);
    }

    delete(
        id: number | string
    ): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/${id}`);        
    }

    search(
        keyword: string
    ): Observable<T[]>{
        let params = new HttpParams()
            .set('keyword', keyword);
        return this.http.get<T[]>(`${this.apiUrl}/search`, {params});
    }
}