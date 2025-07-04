import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {
  const authToken = 'YOUR_AUTH_TOKEN_HERE';

  let router = inject(Router);

  // Clone the request and add the authorization header
  let token = localStorage.getItem('token');
  if (token) {
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }

  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          //alert('401 - tratar');
          router.navigate(['/login']);
        } else if (err.status === 403) {
          alert('Realize o login novamente!');
        } else {
          console.error('HTTP error:', err);
        }
      } else {
        console.error('An error occurred:', err);
      }

      return throwError(() => err);
    })
  );
};
