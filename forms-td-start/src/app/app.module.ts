import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

/*
템플릿 기반 폼은 컴포넌트 템플릿에서 디렉티브를 사용하여 폼을 구성하는 방식으로
각 필드의 형식, 유효성 검증 규칙을 모두 템플릿에서 정의한다. 비교적 간단한 폼에 사용한다.

템플릿 기반 폼은 NgForm, NgModel, NgModelGroup 디렉티브를 중심으로 동작한다.
이들을 사용하기 위해서 @angular/forms 패키지의 FormsModule을 루트 모듈에 추가한다.
*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
