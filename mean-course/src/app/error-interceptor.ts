// 서버에서 에러를 넘겨주면 여기서 인터셉트하는 역할...
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.dialog.open(ErrorComponent, {data: {message: errorMessage}}); // 에러컴포넌트 호출...
        return throwError(error);
      })
    );
  }
}
