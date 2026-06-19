import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const globalHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastrService)
  return next(req).pipe(
    catchError((e:HttpErrorResponse) => {
      switch (e.status){
        case 401:
          toast.error("Bạn chưa đăng nhập hoặc token hết hạn", "lỗi 401");
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
          break;
        case 403: 
          toast.warning("Bạn không đủ quyền truy cập", "Lỗi 403");
          break;
        default:
          toast.error("Có lỗi xảy ra", "lỗi");
          break;
      }
      return throwError(() => e);
    })
  );
};
