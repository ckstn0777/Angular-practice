import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auto-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { PostModuel } from './posts/post.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostModuel
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent] // 진입 컴포넌트는 NgModule가 시작되하거나 라우팅되면서 접속 주소가 변경될 때 사용됩니다.
  // 컴포넌트는 용도에 따라 두 종류로 구분할 수 있습니다. 하나는 템플릿에서 셀렉터로 사용하는 컴포넌트이며, 다른 하나는 모듈에서 명시적으로 지정하는 진입 컴포넌트입니다.
})
export class AppModule { }
