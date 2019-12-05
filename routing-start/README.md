# MyFirstApp
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.
이 앱은 구조가 크게 home / servers / users 3개의 카테고리로 나눠집니다. 나머지 error-page와 page-not-found는 부수적인 부분입니다.

### app-routing.module.ts
라우팅 설정 부분입니다. 여기에 핵심이 많으니까 잘 참고하세요.

### auth-service.ts와 auth-guard.service.ts
인증관련 라우팅 제한 부분입니다. canActivate와 canActivateChild가 있으니 꼭 눈여겨 보시기 바랍니다.

### server-resolver.service.ts
resolve를 활용하는 방법입니다. resolve도 canActivate, canActivateChild과 비슷한 가드입니다.

### 학습순서
기본 라우팅하는 법 공부 -> 라우팅 가드에 대한 공부진행
