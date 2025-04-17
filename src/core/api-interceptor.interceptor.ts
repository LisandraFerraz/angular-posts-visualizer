import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { env } from './environment';
import { inject } from '@angular/core';
import { LoaderService } from 'app/services/loader.service';

export const InterceptorApi: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);

  let clonedReq;

  loader.isLoading.next(true);

  clonedReq = req.clone({
    headers: req.headers.set('Content-type', 'application/json; charset=UTF-8'),
    url: env.BASE_URL + req.url,
  });

  return next(clonedReq).pipe(
    finalize(() => loader.isLoading.next(false)),
    catchError((error) => {
      console.error('Erro ao interceptar a chamada. ');
      return throwError(() => error);
    })
  );
};
