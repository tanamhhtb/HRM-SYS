import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Department,Position} from '../model/profile.model';
import { PROFILE_API } from '../profile.api';
@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);

  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(PROFILE_API.DEPARTMENT(id));
  }

  getPosition(id: number): Observable<Position> {
    return this.http.get<Position>(PROFILE_API.POSITION(id));
  }

  getDepartmentAndPosition(departmentId: number, positionId: number) {
    return forkJoin({
      department: this.getDepartment(departmentId),
      position: this.getPosition(positionId),
    });
  }
}