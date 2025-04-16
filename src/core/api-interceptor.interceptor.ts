import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { env } from './environment';

export const InterceptorApi: HttpInterceptorFn = (req, next) => {
  // aqui vai o loader

  let clonedReq;

  if (req.url) {
    clonedReq = req.clone({
      headers: req.headers.set(
        'Content-type',
        'application/json; charset=UTF-8'
      ),
      url: prepareUrl(req.url.replace(env.BASE_URL, '')),
    });
  }

  return next(clonedReq!).pipe(
    finalize(() => {}),
    catchError((error) => {
      console.error('Erro ao interceptar a chamada. ');
      return throwError(() => error);
    })
  );
};

const prepareUrl = (url: string): string => {
  if (url == env.BASE_URL) {
    return env.BASE_URL + url;
  }
  return '';
};
