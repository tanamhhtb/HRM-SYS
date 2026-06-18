import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const skipAuths = [
    '/auth/login',
    '/auth/logout'
  ];
  const isSkipAuth = skipAuths.some((url) => req.url.includes(url));
  if (isSkipAuth) {
    return next(req);
  }

  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
      const tokenizedReq = req.clone({
        setHeaders: {
          'Content-Type' : 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })
      return next(tokenizedReq);
  }

  return next(req);
};
