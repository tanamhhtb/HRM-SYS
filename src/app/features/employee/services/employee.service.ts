import { Injectable } from "@angular/core";
import { CrudService } from "../../../core/services/crud.service";
import { Employee } from "../models/employee.model";

@Injectable({ providedIn: 'root' })
export class EmployeeService extends CrudService<Employee> {
    
    constructor() {
        super('/employees');
    }

    getEmployees(page: string = '0', size: string = '10', sort?: string) {
        return this.getPage(page, size, sort);
    }
}